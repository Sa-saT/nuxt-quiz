<template>
    <div>
      <h1>Protected Data</h1>
      <div v-if="data">{{ data }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useUserStore } from '@/stores/user'
  
  const data = ref(null)
  
  async function fetchProtectedData() {
    const authStore = useUserStore()
  
    if (authStore.token) {
      try {
        const response = await $fetch('http://localhost:8000/quizes/', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })
        data.value = response
      } catch (error) {
        console.error('Error fetching protected data:', error)
      }
    }
  }
  
  onMounted(fetchProtectedData)
  </script>
  