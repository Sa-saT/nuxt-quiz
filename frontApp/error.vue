<script setup lang="ts">
import { useNuxtApp } from 'nuxt/app'

// Nuxt はエラー発生時にサーバー/クライアントの「payload.error」に格納します。
const { payload } = useNuxtApp()

// payload.error にエラー情報が入っていれば取得
const errorData = payload?.error || null
</script>

<template>
  <div class="p-6 text-center">
    <p class="text-2xl font-bold text-red-500">Something went wrong...</p>

    <!-- エラー情報があれば表示 -->
    <div v-if="errorData" class="mt-4">
      <p>Error: {{ errorData.message }}</p>
      <p v-if="errorData.statusCode">Status Code: {{ errorData.statusCode }}</p>
    </div>

    <NuxtLink to="/" class="inline-block mt-6 px-4 py-2 text-white bg-blue-600 hover:bg-blue-800 rounded">
      トップページへ戻る
    </NuxtLink>
  </div>
</template>