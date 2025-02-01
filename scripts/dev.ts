import { exec, spawn } from 'node:child_process'
import { promisify } from 'node:util'
import { Listr } from 'listr2'
import { logLogo } from './logo'

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

logLogo()

new Listr(
  [
    {
      title: 'Clearing up cache...',
      task: async (_, task) => {
        await runCommand('nuxt cleanup', task)
      },
    },
    {
      title: 'Launching server',
      task: async (_, task) => {
        const shouldStop = false
        const cmd = spawn('node', ['node_modules/nuxt/bin/nuxt.mjs', 'dev', '--port', '3000'])

        task.title = 'Command spawned'

        cmd.stdout.on('data', (data) => {
          task.output = `${task.output === undefined ? '-----LOGGING STARTED-----' : task.output}\n${data}`
        })

        cmd.stderr.on('data', (data) => {
          task.output = `${task.output === undefined ? '-----LOGGING STARTED-----' : task.output}\n${data}`
        })

        cmd.on('close', (code) => {
          task.title = `${task.output}\nProcess stopped with code: ${code}`
          task.skip()
          cmd.kill()
          process.exit()
        })

        process.on('SIGINT', async function () {
          task.title = 'Server stopped'
          task.skip()
          cmd.kill()
          process.exit()
        })

        while (!shouldStop) {
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      },
    },
  ], {
    registerSignalListeners: false,
  },
).run()
