import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { Listr } from 'listr2'

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
        else { console.log(stderr) }
      }
      else {
        if (task) {
          task.output = stdout
        }
        else { console.log(stdout) }
      }
    }
  }
  catch (error) {
    if (!disableStdout) {
      if (task) {
        task.output = String(error)
      }
      else { console.log(String(error)) }
    }
  }
}

try {
  new Listr(
    [
      {
        title: 'Cleaning up cache...',
        task: async (_, task) => {
          await runCommand('nuxt cleanup', task)
        },
      },
      {
        title: 'Launching server on http://localhost:3000',
        task: async () => {
          runCommand('nuxt dev --port 3000', null, true)
        },
      },
    ],
  ).run()
}
finally {
  console.log()
}
