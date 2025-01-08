import { createWriteStream } from 'node:fs'
import { request } from 'node:https'
import type { IncomingMessage } from 'node:http'
import { basename } from 'node:path'

export async function downloadFile(task, url: string, path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileName = basename(path)

    task.title = `Starting download: ${fileName}`

    const req = request(url, (res: IncomingMessage) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download file. Status code: ${res.statusCode}`))
        return
      }

      const totalSize = Number.parseInt(res.headers['content-length'] || '0', 10)
      let downloadedSize = 0

      const fileStream = createWriteStream(path)

      res.on('data', (chunk) => {
        downloadedSize += chunk.length
        if (totalSize) {
          const progress = Math.round((downloadedSize / totalSize) * 100)
          const progressBar = '[' + '='.repeat(Math.floor((downloadedSize / totalSize) * 20)) + ' '.repeat(20 - Math.floor((downloadedSize / totalSize) * 20)) + ']'
          task.title = `Downloading ${fileName}: ${progressBar} ${progress}% (${(downloadedSize / (1024 * 1024)).toFixed(2)} MB / ${(totalSize / (1024 * 1024)).toFixed(2)} MB)`
        }
        else {
          task.title = `Downloading ${fileName}: ${(downloadedSize / (1024 * 1024)).toFixed(2)} MB downloaded`
        }
      })

      res.pipe(fileStream)

      fileStream.on('finish', () => {
        fileStream.close(() => {
          resolve()
        })
      })

      fileStream.on('error', (err) => {
        fileStream.close()
        reject(err)
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    req.end()
  })
}
