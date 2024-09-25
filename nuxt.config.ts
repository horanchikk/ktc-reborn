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
  app: {
    head: {
      script: [
        {
          src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/tgs-player.js"
        }
      ],
    }
  },
  googleFonts: {
    download: true,
    families: {
      Montserrat: '100..900'
    }
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || "http://localhost:8000"
    }
  },
})