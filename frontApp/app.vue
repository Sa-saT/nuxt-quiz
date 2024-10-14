<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
// const resetError = (error) => {
//   error.value = null;
// };

onMounted(() => {
  userStore.fetchUser()
  // userStore.initStore()
}) 
</script>

<template>
  <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
  </div>
</template>
