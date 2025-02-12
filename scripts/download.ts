import { createWriteStream } from 'node:fs'
import { request } from 'node:https'
import type { IncomingMessage } from 'node:http'
import { basename } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { Transform } from 'node:stream'

export async function downloadFile(task, url: string, path: string): Promise<void> {
  const fileName = basename(path)
  task.title = `Starting download: ${fileName}`

  await new Promise<void>((resolve, reject) => {
    const req = request(url, (res: IncomingMessage) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download file. Status code: ${res.statusCode}`))
        return
      }

      const totalSize = Number.parseInt(res.headers['content-length'] || '0', 10)
      let downloadedSize = 0

      // Create a transform stream that updates progress
      const progressStream = new Transform({
        transform(chunk, encoding, callback) {
          downloadedSize += chunk.length

          if (totalSize) {
            const ratio = downloadedSize / totalSize
            const progress = Math.round(ratio * 100)
            const progressBarCount = Math.floor(ratio * 20)
            const progressBar = `[${'='.repeat(progressBarCount)}${' '.repeat(20 - progressBarCount)}]`
            task.title = `Downloading ${fileName}: ${progressBar} ${progress}% (${(downloadedSize / (1024 * 1024)).toFixed(2)} MB / ${(totalSize / (1024 * 1024)).toFixed(2)} MB)`
          }
          else {
            task.title = `Downloading ${fileName}: ${(downloadedSize / (1024 * 1024)).toFixed(2)} MB downloaded`
          }

          callback(null, chunk)
        },
      })

      const fileStream = createWriteStream(path)

      // Use pipeline to handle piping and errors automatically.
      pipeline(res, progressStream, fileStream)
        .then(resolve)
        .catch(reject)
    })

    req.on('error', reject)
    req.end()
  })
}
