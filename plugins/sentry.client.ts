import * as Sentry from '@sentry/nuxt'

const { public: { SENTRY_DSN } } = useRuntimeConfig()

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [Sentry.replayIntegration()],

  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost'],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
