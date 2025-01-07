import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // app: {
  //   cdnURL: '/nuxt-quiz/'
  // },
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
  app: {
    baseURL: '/nuxt-quiz/'  // リポジトリ名を指定
  },
  // publicRuntimeConfig: {
  //   apiUrl: process.env.API_URL || 'http://localhost:8000'
  // },
  // ssr: false,
})
 