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
            const error = ctx.args[0]
            if (error?.message?.includes('Failed to fetch')) {
              return
            }
            Sentry.captureException(error)
          }
        },
      },
    ],
  })

  return log
}
