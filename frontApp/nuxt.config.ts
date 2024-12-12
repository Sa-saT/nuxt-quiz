import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // router: {
  //   base: '/<repository-name>/'
  // },
  // publicRuntimeConfig: {
  //   apiUrl: process.env.API_URL || 'http://localhost:8000'
  // },
  // ssr: false,
})
