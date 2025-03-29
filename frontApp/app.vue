<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

// ローディング状態管理
const isLoading = ref(false)

const router = useRouter()

const userStore = useUserStore()

onMounted(() => {
  userStore.initialize()
  router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
  })

  // router.afterEach(() => {
  //   // アニメ感の為のディレイ
  //   setTimeout(() => {
  //     isLoading.value = false
  //   }, 800)
  // })
}) 
</script>

<template>
  <div>
      <NuxtLayout>
        <PawLoader :isLoading="isLoading" />
        <PawLoaderMobile :isLoading="isLoading" />
        <NuxtPage />
      </NuxtLayout>
  </div>
</template>
