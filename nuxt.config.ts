export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
    '@nuxt/icon',
  ],
  ssr: false,
  
  css: ['animate.css'],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'primary': "#4caf50"
          }
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  },
})