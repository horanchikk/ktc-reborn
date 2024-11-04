import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { Listr } from 'listr2'
import consola from 'consola'

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
                task: async (_, task) => {
                  await runCommand('rm -rf ./.nuxt ./.output', task)
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
                task: async (_, task) => {
                  await runCommand('rm -rf ./android ./ios', task)
                },
              },
              {
                title: 'Re-building mobile sources',
                task: async (_, task) => {
                  await runCommand('npx cap add android', task)
                  await runCommand('npx cap add ios', task)
                  await runCommand('npx cap sync', task)
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
