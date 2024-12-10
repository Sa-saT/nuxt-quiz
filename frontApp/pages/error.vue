<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 class="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
      <p class="text-gray-600 text-lg mb-8">{{ errorMessage }}</p>
      <button @click="goHome" class="py-2 px-4 bg-blue-600 text-white rounded-md">
        Go Back to Home
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useError, navigateTo } from 'nuxt/app'
  
  const error = useError()
  const errorMessage = error?.statusMessage || 'An unknown error occurred.'
  
  const goHome = () => {
    navigateTo('/')
  }
  </script>
  