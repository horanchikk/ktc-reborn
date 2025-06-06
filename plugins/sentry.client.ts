import * as Sentry from '@sentry/nuxt'

export default defineNuxtPlugin(() => {
  const { public: { SENTRY_DSN } } = useRuntimeConfig()

  const sentry = Sentry.init({
    dsn: import.meta.dev ? '' : SENTRY_DSN,
    integrations: [Sentry.replayIntegration()],
  
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost'],
  
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })

  return {
    provide: {
      sentry,
    }
  }
})
