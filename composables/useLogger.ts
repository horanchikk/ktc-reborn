import * as Sentry from '@sentry/nuxt'
import { createConsola, consola } from 'consola'

export function useLogger(tag: string) {
  const log = createConsola({
    formatOptions: {
      date: true,
      colors: true,
    },
    defaults: {
      tag,
    },
    reporters: [
      {
        log: (ctx) => {
          // Logging only on DEV
          if (import.meta.dev) {
            consola._log(ctx)
          }

          if (ctx.type === 'error') {
            Sentry.captureException(ctx.args[0])
          }
        },
      },
    ],
  })

  return log
}
