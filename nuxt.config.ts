export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-booster'
  ],
  ssr: false,
  css: ['animate.css', '~/public/css/config.css'],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'primary': "#FF4646",
            'background': {
              100: "#212121",
              200: "#323232"
            }
          }
        }
      }
    }
  },

  googleFonts: {
    download: true,
    families: {
      Montserrat: '100..900'
    }
  },

  fontMetrics: {
    fonts: ['Montserrat']
  },

  runtimeConfig: {
    public: {
      API_URL: import.meta.env.API_URL || "http://localhost:8000"
    }
  },
})
