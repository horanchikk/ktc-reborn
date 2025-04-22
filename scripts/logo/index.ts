import * as fs from 'node:fs'

export const logLogo = () => console.log(fs.readFileSync('./scripts/logo/logo.txt').toString() + `\n by @horanchikk 🙌 @ethosa \n`)
