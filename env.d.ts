declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string
      ACCOUNT_LOGIN: string
      ACCOUNT_PASSWD: string

      SENTRY_ORG: string
      SENTRY_PROJECT: string
      SENTRY_AUTH_TOKEN: string
      SENTRY_DSN: string
    }
  }
}

export {}
