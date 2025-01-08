import fs from 'node:fs'

export function doesFileExist(filePath: string) {
  try {
    return fs.existsSync(filePath)
  }
  catch {
    return false
  }
}
