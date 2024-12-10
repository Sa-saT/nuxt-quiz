import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
