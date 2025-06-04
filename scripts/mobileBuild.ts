import os from 'node:os'
import { Listr } from 'listr2'
import { config as initDE } from 'dotenv'
import fs from 'node:fs/promises'
import { logLogo } from './logo'
import { downloadFile } from './download'
import { config, currentPath } from './config'
import {
  fileExistsAsync,
  removeDir,
  createDir,
  runCommand,
  ensureDownloadedAndExtracted,
  renameWithOverwrite,
} from './utils'

initDE()
logLogo()

// ----------------------------
// Main Listr Tasks definition
// ----------------------------
await new Listr(
  [
    {
      title: 'Rebuilding Nuxt.js Sources',
      task: () =>
        new Listr(
          [
            {
              title: 'Removing old Nuxt build',
              task: async () => {
                await Promise.all([removeDir('.output')])
              },
            },
            {
              title: 'Generating static build using Nuxt',
              task: async (_, task) => {
                await runCommand('nuxt', ['generate'], { task })
              },
            },
          ],
          { concurrent: false },
        ),
    },
    {
      title: 'Configuring Capacitor Platforms',
      task: async (_, task) => {
        try {
          await runCommand('npx', ['cap', 'add', 'android'], { task })
          await runCommand('npx', ['cap', 'add', 'ios'], { task })
        } catch {
          await runCommand('npx', ['cap', 'sync'], { task })
        }
      },
    },
    {
      title: "Generating assets",
      task: async (ctx, subTask) => {
        await runCommand('npx', ["@capacitor/assets", "generate", "--iconBackgroundColor", "'#323232'", "--iconBackgroundColorDark", "'#323232'", "--splashBackgroundColor", "'#323232'", "--splashBackgroundColorDark", "'#323232'"], {
          task: subTask,
          maxOutputLines: 3,
        })
      }
    },
    {
      title: 'Assembling Android Application',
      task: () =>
        new Listr(
          [
            {
              title: 'Verifying Java SE 20 Installation',
              task: async (ctx, subTask) => {
                subTask.title = 'Checking Java installation'
                if (!(await fileExistsAsync(config.JAVA_BIN))) {
                  const systemConfig: Partial<
                    Record<NodeJS.Platform, Partial<Record<NodeJS.Architecture, string>>>
                  > = {
                    linux: {
                      x64: `https://download.oracle.com/java/${config.JAVA_VERSION.split('.')[0]}/archive/jdk-${config.JAVA_VERSION}_linux-x64_bin.tar.gz`,
                      arm64: `https://download.oracle.com/java/${config.JAVA_VERSION.split('.')[0]}/archive/jdk-${config.JAVA_VERSION}_linux-aarch64_bin.tar.gz`,
                    },
                    // TODO: add support for win32
                  }
                  const platform = os.platform() as keyof typeof systemConfig
                  const arch = os.arch()
                  const url = systemConfig[platform]?.[arch]
                  if (!url) {
                    throw new Error(
                      'Your system platform is not supported for Java installation',
                    )
                  }
                  await createDir(config.JAVA_DIR)
                  await ensureDownloadedAndExtracted(
                    config.JAVA_BIN,
                    url,
                    `jdk-${config.JAVA_VERSION}.tar.gz`,
                    [
                      `rm -rf ${config.JAVA_DIR}/* && mkdir -p ${config.JAVA_DIR}`,
                      `tar -xzf jdk-${config.JAVA_VERSION}.tar.gz -C ${config.JAVA_DIR}`,
                      `rm jdk-${config.JAVA_VERSION}.tar.gz`,
                    ],
                    { task: subTask },
                  )
                  subTask.title = 'Java installed'
                }
                else {
                  subTask.title = 'Java already installed'
                }
              },
            },
            {
              title: 'Verifying Android SDK Installation',
              task: async (ctx, subTask) => {
                const toolsCheck = config.ANDROID_TOOLS.map(tool =>
                  fileExistsAsync(`${config.SDK_DIR}/${tool.replace(';', '/')}/package.xml`),
                )
                const sdkInstalled = (await Promise.all(toolsCheck)).every(Boolean)
                // Save the result for later tasks.
                ctx.isSdkInstalled = sdkInstalled
                subTask.title = sdkInstalled
                  ? 'Android SDK is installed'
                  : 'Android SDK not found, installation required'
              },
            },
            {
              title: 'Installing Android Command Line Tools',
              task: async (ctx, subTask) => {
                if (ctx.isSdkInstalled) {
                  subTask.skip('Command Line Tools already installed')
                  return
                }
                if (!(await fileExistsAsync(config.CMD_TOOLS_ARCHIVE))) {
                  await downloadFile(
                    subTask,
                    'https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip',
                    config.CMD_TOOLS_ARCHIVE,
                  )
                }
                subTask.title = 'Unzipping archive'
                await runCommand(
                  'bash',
                  ['-c', `"rm -rf ${config.CMD_TOOLS_DIR} && unzip ${config.CMD_TOOLS_ARCHIVE}"`],
                  { task: subTask },
                )
                subTask.title = 'Android Command Line Tools installed'
              },
            },
            {
              title: 'Installing Additional Android SDK Components',
              skip: ctx =>
                ctx.isSdkInstalled ? 'Additional tools already installed' : false,
              task: async (ctx, subTask) => {
                subTask.title = 'Accepting Android licenses'
                await createDir(config.SDK_DIR)
                await runCommand('bash', ['-c', `"chmod +x ./${config.CMD_TOOLS_DIR}/bin/sdkmanager"`], {
                  task: subTask,
                  disableOutput: true,
                })
                await runCommand(
                  'bash',
                  [
                    '-c',
                    `"yes | ./${config.CMD_TOOLS_DIR}/bin/sdkmanager --sdk_root=${currentPath}/${config.SDK_DIR.slice(2)} --licenses"`,
                  ],
                  { task: subTask, disableOutput: true },
                )

                for (const tool of config.ANDROID_TOOLS) {
                  subTask.title = `Installing: ${tool}`
                  await runCommand(
                    'bash',
                    [
                      '-c',
                      `"./${config.CMD_TOOLS_DIR}/bin/sdkmanager --sdk_root=${currentPath}/${config.SDK_DIR.slice(2)} --install '${tool}'"`,
                    ],
                    { task: subTask, disableOutput: true },
                  )
                }
                subTask.title = 'Additional Android SDK components installed'
              },
            },
            {
              title: 'Updating version for Android and IOS application',
              task: async () => {
                if (!process.env.APP_VERSION) {
                  throw new Error('APP_VERSION environment variable is not set')
                }
            
                // 1. Обновляем build.gradle
                const gradlePath = `${currentPath}/android/app/build.gradle`
                let gradleContent = await fs.readFile(gradlePath, 'utf8')
            
                // Инкрементируем versionCode
                gradleContent = gradleContent.replace(
                  /(versionCode\s+)(\d+)/,
                  (_, prefix, code) => prefix + (Number.parseInt(code) + 1)
                )
            
                // Обновляем versionName
                gradleContent = gradleContent.replace(
                  /(versionName\s+["'])([^"']*)(["'])/,
                  `$1${process.env.APP_VERSION}$3`
                )
            
                await fs.writeFile(gradlePath, gradleContent)
            
                // 2. Обновляем config.xml
                const configPath = `${currentPath}/ios/App/App/config.xml`
                let configContent = await fs.readFile(configPath, 'utf8')
                
                // Добавляем/обновляем атрибут ios-CFBundleVersion
                if (configContent.includes('ios-CFBundleVersion')) {
                  configContent = configContent.replace(
                    /(ios-CFBundleVersion=)(["'][^"']*["'])/,
                    `$1"${process.env.APP_VERSION}"`
                  )
                } else {
                  configContent = configContent.replace(
                    /(<widget[^>]*)/,
                    `$1 ios-CFBundleVersion="${process.env.APP_VERSION}"`
                  )
                }
            
                await fs.writeFile(configPath, configContent)
              }
            },
            {
              title: 'Compiling Android Project using Gradle',
              task: async (ctx, subTask) => {
                subTask.title = 'Gradle is building the project, please wait'
                await runCommand('bash', ['-c', '"cd android && ./gradlew assembleDebug"'], {
                  task: subTask,
                  maxOutputLines: 3,
                })
                renameWithOverwrite(`${currentPath}/android/app/build/outputs/apk/debug/app-debug.apk`, `${currentPath}/${process.env.APP_VERSION}.apk`)
                subTask.title = `APK built at: ${currentPath}/${process.env.APP_VERSION}.apk`
              },
            },
            {
              title: `Deploying APK to Connected Android Device ${!process.env.ANDROID_DEVICE_ID ? '[Will be skipped]' : ''}`,
              skip: () => !process.env.ANDROID_DEVICE_ID,
              task: async (ctx, subTask) => {
                const adb = `${config.SDK_DIR}/platform-tools/adb`
                const launchAppCommand = 'shell monkey -p app.hapticx.procollege -c android.intent.category.LAUNCHER 1'.split(' ')

                subTask.title = 'Checking connected devices'
                await runCommand(adb, ['devices'], { task: subTask })
                try {
                  subTask.title = 'Uninstall old package'
                  await runCommand(
                    adb,
                    [
                      '-s',
                      process.env.ANDROID_DEVICE_ID,
                      'uninstall',
                      'app.hapticx.procollege',
                    ],
                    { task: subTask },
                  )
                } catch {
                  subTask.title = "Package not found";
                }
                subTask.title = 'Installing APK on device'
                await runCommand(
                  adb,
                  [
                    '-s',
                    process.env.ANDROID_DEVICE_ID,
                    'install',
                    `${currentPath}/${process.env.APP_VERSION}.apk`,
                  ],
                  { task: subTask },
                )
                subTask.title = 'Launching the application'
                await runCommand(adb, ['-s', process.env.ANDROID_DEVICE_ID, ...launchAppCommand])
                subTask.title = `App launched on device: ${process.env.ANDROID_DEVICE_ID}`
              },
            },
          ],
          { concurrent: false },
        ),
    },
  ],
  {
    concurrent: false,
    rendererOptions: {
      collapseSubtasks: false,
      formatOutput: 'wrap',
    },
  },
).run()
