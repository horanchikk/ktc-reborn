import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'
import fs from 'node:fs'
import { Listr } from 'listr2'
import consola from 'consola'
import { config } from 'dotenv'
import { logLogo } from './logo'
import { downloadFile } from './download'
import { doesFileExist } from './fileExists'

config()

// yes | sdkmanager --sdk_root=/home/horanchikk/Documents/Sdk --licenses
// sdkmanager --sdk_root=/home/horanchikk/Documents/Sdk --install "emulator" "build-tools;34.0.0" "build-tools;35.0.0" "platforms;android-34" "platform-tools"
// export PATH=/home/horanchikk/Documents/jdk-20/bin:$PATH && ionic capacitor run android --list

const execAsync = promisify(exec)
const currentPath = path.resolve()

async function runCommand(
  command: string,
  task?: {
    output: string
  },
  disableStdout: boolean | undefined = false,
) {
  try {
    const { stdout, stderr } = await execAsync(command)

    if (!disableStdout) {
      if (stderr) {
        if (task) {
          task.output = stderr
        }
        else { consola.log(stderr) }
      }
      else {
        if (task) {
          task.output = stdout
        }
        else { consola.log(stdout) }
      }
    }
  }
  catch (error) {
    if (!disableStdout) {
      if (task) {
        task.output = String(error)
      }
      else {
        consola.log(String(error))
      }
    }
  }
}

logLogo()

const ANDROID_DEVICE_ID = process.env.ANDROID_DEVICE_ID
const tools = ['emulator', 'build-tools;34.0.0', 'build-tools;35.0.0', 'platforms;android-34', 'platform-tools']
let isSdkInstalled = true

for (const tool of tools) {
  if (!doesFileExist(`./sdk/${tool.replace(';', '/')}/package.xml`)) {
    isSdkInstalled = false
    break
  }
}

try {
  await new Listr(
    [
      {
        title: 'Building nuxt',
        task: (_, task): Listr =>
          task.newListr(
            [
              {
                title: 'Removing old build',
                task: async (_) => {
                  fs.rmSync('./.nuxt', { recursive: true, force: true })
                  fs.rmSync('./.output', { recursive: true, force: true })
                },
              },
              {
                title: 'Re-building nuxt sources',
                task: async () => {
                  await runCommand('nuxt generate', task)
                },
              },
            ],
          ),
      },
      {
        title: 'Building capacitor',
        task: (_, task): Listr =>
          task.newListr(
            [
              {
                title: 'Clearing old mobile builds',
                task: async (_) => {
                  fs.rmSync('./android', { recursive: true, force: true })
                  fs.rmSync('./ios', { recursive: true, force: true })
                },
              },
              {
                title: 'Adding mobile sources',
                task: async (_, task) => {
                  await runCommand('npx cap add android', task)
                  await runCommand('npx cap add ios', task)
                  await runCommand('npx cap sync', task)
                },
              },
            ],
          ),
      },
      {
        title: `Android app ${!ANDROID_DEVICE_ID || ANDROID_DEVICE_ID.length === 0 ? '[Will be skipped]' : ''}`,
        skip: !ANDROID_DEVICE_ID || ANDROID_DEVICE_ID.length === 0,
        task: (_, task): Listr =>
          task.newListr(
            [
              {
                title: 'Download Java SE 20',
                task: async (_, task) => {
                  task.title = 'Checking java'
                  if (!doesFileExist('./jdk/jdk-20/bin/java')) {
                    await downloadFile(task, 'https://download.java.net/openjdk/jdk20/ri/openjdk-20+36_linux-x64_bin.tar.gz', 'jdk-20.tar.gz')
                    task.title = 'Unzipping archive'
                    await runCommand('rm -rf ./jdk && mkdir jdk && tar -xzf jdk-20.tar.gz -C jdk && rm jdk-20.tar.gz')
                    task.title = 'Java installed'
                  }
                  else {
                    task.title = 'Java already installed'
                  }
                },
              },
              {
                title: 'Download Command Line Tools for Android',
                task: async (_, task) => {
                  if (isSdkInstalled) {
                    task.title = 'Command Line Tools already installed'
                  }
                  else {
                    await downloadFile(task, 'https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip', 'cmdline-tools.zip')

                    task.title = 'Unzipping archive'
                    await runCommand('rm -rf ./cmdline-tools && unzip cmdline-tools.zip && rm cmdline-tools.zip')

                    task.title = 'Command Line Tools successfully installed'
                  }
                },
              },
              {
                title: 'Download additional tools for Android',
                task: async (_, task) => {
                  if (isSdkInstalled) {
                    task.title = 'Additional tools already installed'
                  }
                  else {
                    task.title = 'While you using this application, you accepting all Android licenses'

                    await runCommand(`yes | ./cmdline-tools/bin/sdkmanager --sdk_root=${currentPath}/sdk --licenses`)

                    for (const tool of tools) {
                      task.title = `Downloading ${tool}`
                      await runCommand(`./cmdline-tools/bin/sdkmanager --sdk_root=${currentPath}/sdk --install "${tool}"`)
                    }

                    task.title = 'Additional tools successfully installed'
                  }
                },
              },
              {
                title: 'Setup local env',
                task: async (_, task) => {
                  await runCommand(`export PATH=${currentPath}/jdk/jdk-20/bin:$PATH && export ANDROID_SDK_ROOT=${currentPath}/sdk`)
                  task.title = 'ENV successfully setuped'
                },
              },
              {
                title: 'Build android project',
                task: async (_, task) => {
                  task.title = 'Gradle is building project, please wait'
                  await runCommand('pnpm --package=@capacitor/cli dlx cap build android', task)
                  task.title = 'Gradle building is finished'
                },
              },
              {
                title: 'Run apk',
                task: async (_, task) => {
                  task.title = `Running app on device ${ANDROID_DEVICE_ID}`
                  await runCommand(`pnpm --package=@capacitor/cli dlx cap run android --no-sync --target ${ANDROID_DEVICE_ID}`, task)
                  task.title = `Launched at ${ANDROID_DEVICE_ID}`
                },
              },
            ],
          ),
      },
    ],
    { concurrent: false, rendererOptions: { collapseSubtasks: false } },
  ).run()
}
catch (e) {
  console.error(e)
}
