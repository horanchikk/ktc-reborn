import * as fs from 'node:fs'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { Listr } from 'listr2'
import consola from 'consola'
import { config } from 'dotenv'
import { logLogo } from './logo'

config()

const execAsync = promisify(exec)

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
const SDK_LOCATION = process.env.SDK_LOCATION

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
                  await runCommand('nuxt build', task)
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
        title: 'Launch app on android device',
        skip: !ANDROID_DEVICE_ID,
        task: async (_, task) => {
          task.title = 'Gradle is building'
          await runCommand(`export ANDROID_SDK_ROOT=${SDK_LOCATION}`, task)
          await runCommand(`pnpm --package=@capacitor/cli dlx cap run android --no-sync`, task)
          task.title = `Launched!`
        },
      },
    ],
    { concurrent: false, rendererOptions: { collapseSubtasks: false } },
  ).run()
}
catch (e) {
  console.error(e)
}
