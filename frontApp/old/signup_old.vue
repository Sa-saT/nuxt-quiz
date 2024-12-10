<!-- <template>
    <div class="py-10 px-6">
      <div class="max-w-sm mx-auto py-10 px-6 bg-gray-100 rounded-xl">
        <h1 class="mb-6 text-2xl">Sign Up</h1>
  
        <form v-on:submit.prevent="submitForm">
          <input v-model="email" type="email" placeholder="Your email address..." class="w-full mb-4 py-4 px-6 rounded-xl"></input>
          <input v-model="password1" type="password" placeholder="Your password..." class="w-full mb-4 py-4 px-6 rounded-xl"></input>
          <input v-model="password2" type="password" placeholder="Repeat password..." class="w-full mb-4 py-4 px-6 rounded-xl"></input>
  
          <div v-if="errors.length" class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
  
          <button class="py-4 px-6 bg-teal-700 text-white rounded-xl">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { navigateTo } from "nuxt/app"
  
  const email = ref('')
  const password1 = ref('')
  const password2 = ref('')
  const errors = ref<string[]>([])
  
  const authStore = useUserStore()
  
  // サインアップフォームの処理
  const submitForm = async () => {
    try {
      await authStore.signup(email.value, password1.value, password2.value)
        navigateTo('/top')
    } catch (error) {
      errors.value = [(error as Error).message || 'An error occurred during signup']
    }
  }
  </script>
   -->