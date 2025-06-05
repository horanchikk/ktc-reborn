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

/// <reference types="vitest" />
/// <reference types="@nuxt/types" />
/// <reference types="@nuxtjs/color-mode" />
/// <reference types="@nuxt/image" />
/// <reference types="@nuxtjs/google-fonts" />
/// <reference types="@nuxtjs/tailwindcss" />
/// <reference types="@pinia/nuxt" />
/// <reference types="@sentry/nuxt" />
/// <reference types="nuxt-booster" />
/// <reference types="nuxt-snackbar" />
/// <reference types="nuxt-svgo" />
/// <reference types="vue" />
/// <reference types="vue-router" />
/// <reference types="vue-virtual-scroller" />
/// <reference types="@capacitor/core" />
/// <reference types="@capacitor/app" />
/// <reference types="@capacitor/browser" />
/// <reference types="@capacitor/haptics" />
/// <reference types="@capacitor/keyboard" />
/// <reference types="@capacitor/splash-screen" />
/// <reference types="@capacitor/status-bar" />
/// <reference types="@capgo/capacitor-navigation-bar" />

export {}
