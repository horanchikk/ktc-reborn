export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
    'nuxt-booster',
    'nuxt-svgo',
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
    },
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
})
