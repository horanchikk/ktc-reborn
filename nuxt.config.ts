export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
    '@sentry/nuxt/module',
    'nuxt-booster',
    'nuxt-svgo',
    'nuxt-snackbar',
  ],
  ssr: false,
  devtools: { enabled: true },
  css: ['animate.css', '~/public/css/config.css'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ['lottie-player'].includes(tag),
    },
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://localhost:8000',
      ACCOUNT_LOGIN: process.env.ACCOUNT_LOGIN,
      ACCOUNT_PASSWD: process.env.ACCOUNT_PASSWD,
      SENTRY_DSN: process.env.SENTRY_DSN,
      APP_VERSION: process.env.APP_VERSION,
    },
  },

  sourcemap: {
    client: true,
  },
  devServer: {
    port: 3000,
  },

  compatibilityDate: '2024-04-03',
  fontMetrics: {
    fonts: ['Montserrat'],
  },

  googleFonts: {
    download: true,
    families: {
      Montserrat: '100..900',
    },
  },

  sentry: {
    sourceMapsUploadOptions: {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    },
  },

  svgo: {
    autoImportPath: '~/assets/icons',
    componentPrefix: 'i',
    defaultImport: 'component',
    svgoConfig: {
      plugins: [
        {
          name: 'convertColors',
          params: {
            currentColor: true,
          },
        },
      ],
    },
  },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: '#FF4646',
            foreground: '#EDE8D8',
            background: {
              100: '#212121',
              200: '#323232',
            },
          },
        },
      },
    },
  },

  snackbar: {
    bottom: true,
    duration: 3000,
    border: 'left',
    baseBackgroundColor: '#323232',
    dismissOnActionClick: false,
    dense: true,
    shadow: true,
  }
})