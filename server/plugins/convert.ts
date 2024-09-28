import { createConsola } from 'consola'
import { ungzip } from 'pako'
import * as fs from 'fs'

const dir = "./public"
const logger = createConsola({
  formatOptions: {
    colors: true,
    compact: false,
    date: true,
  },
  defaults: {
    tag: "TGS2LOTTIE",
  },
})

export default defineNitroPlugin(async ({hooks}) => {
  hooks.hookOnce("request", () => {
    const files = fs.readdirSync(`${dir}/tgs`);
    let converted = 0;
    
    files.forEach((fileName: string) => {
      const tgz_file = fs.readFileSync(`${dir}/tgs/${fileName}`)
      if (tgz_file) {
        try {
          fs.readFileSync(`${dir}/lottie/${fileName.slice(0, fileName.length - 4)}.json`)
        } catch (e) {
          fs.writeFileSync(`${dir}/lottie/${fileName.slice(0, fileName.length - 4)}.json`, ungzip(tgz_file))
          converted += 1;
        }
      }
    })

    logger.info(`Converted ${converted} TGZ files`)
  })
 
})
