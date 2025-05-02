import fs from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { envVars } from './config'
import { downloadFile } from './download'

export async function fileExistsAsync(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  }
  catch {
    return false
  }
}

export async function renameWithOverwrite(oldPath: string, newPath: string): Promise<void> {
  try {
    try {
      await fs.access(newPath);
      await fs.unlink(newPath);
      console.log(`Файл по пути "${newPath}" был удален`);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw err;
      }
    }

    await fs.rename(oldPath, newPath);
  } catch (err) {
    const error = err as NodeJS.ErrnoException;
    throw error;
  }
}

export async function removeDir(dir: string): Promise<void> {
  await fs.rm(dir, { recursive: true, force: true })
}

export async function createDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true })
}

export async function runCommand(
  command: string,
  args: string[] = [],
  options: {
    task?: { output?: string }
    env?: NodeJS.ProcessEnv
    disableOutput?: boolean
    maxOutputLines?: number
  } = { disableOutput: false },
): Promise<void> {
  if (!options.env) options.env = envVars

  const maxOutputLines = options.maxOutputLines ?? 10

  return new Promise((resolve, reject) => {
    const finalEnv = { ...envVars, ...(options.env || {}) }

    let outputLines: string[] = [`$ ${command} ${args.join(' ')}`]

    let remainingData = ''

    const child = spawn(command, args, { env: finalEnv, shell: true })

    const updateOutput = (data: Buffer) => {
      const text = data.toString()

      const fullText = remainingData + text
      const lines = fullText.split('\n')

      if (!fullText.endsWith('\n')) {
        remainingData = lines.pop() ?? ''
      }
      else {
        remainingData = ''
      }

      outputLines.push(...lines)

      if (outputLines.length > maxOutputLines) {
        outputLines = outputLines.slice(outputLines.length - maxOutputLines)
      }

      if (options.task) {
        options.task.output = outputLines.join('\n')
      }
    }

    if (!options.disableOutput) {
      child.stdout.on('data', updateOutput)
      child.stderr.on('data', updateOutput)
    }

    child.on('error', reject)

    child.on('close', (code) => {
      if (remainingData) {
        outputLines.push(remainingData)
      }
      if (outputLines.length > maxOutputLines) {
        outputLines = outputLines.slice(outputLines.length - maxOutputLines)
      }
      if (options.task) {
        options.task.output = outputLines.join('\n')
      }
      if (code === 0) {
        resolve()
      }
      else {
        reject(
          new Error(
            `Command "${command} ${args.join(' ')}" exited with code ${code}\nOutput:\n${outputLines.join('\n')}\nENV: ${JSON.stringify(options.env)}`,
          ),
        )
      }
    })
  })
}

export async function extractArchive(
  archiveName: string,
  extractCommand: string[],
  options: { task?: { output?: string } } = {},
) {
  // TODO: extract zip using library
  await runCommand('bash', ['-c', `"${extractCommand.join(' && ')}"`], options)
}

export async function ensureDownloadedAndExtracted(
  filePath: string,
  downloadUrl: string,
  archiveName: string,
  extractCommand: string[],
  options: { task?: { output?: string } } = {},
): Promise<void> {
  if (!(await fileExistsAsync(filePath))) {
    await downloadFile(options.task, downloadUrl, archiveName)
    await extractArchive(archiveName, extractCommand, options)
  }
}
