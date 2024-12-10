<!-- <template>
    <div>
      <h1>Protected Data</h1>
      <div v-if="data">{{ data }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useUserStore } from '@/stores/user'
  
  const userStore = useUserStore()
  const router = useRouter()

  onMounted(() => {
    if (!userStore.user) {
        router.push('/login')
    }
})

  const data = ref([])
  
  async function fetchProtectedData() {

    if (userStore.token) {
      try {
        const response = await $fetch('http://localhost:8000/api/quizes/', {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        })
        data.value = response
      } catch (error) {
        console.error('Error fetching protected data:', error)
      }
    }
  }
  
  // onMounted(fetchProtectedData)
  </script>
   -->