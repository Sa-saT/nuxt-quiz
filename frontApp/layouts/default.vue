<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

function logout() {
    userStore.logout()
}
</script>

<template>
  <div>
    <nav class="p-6 flex items-center justify-between bg-teal-800">
    <div class="flex items-center space-x-4">
    <NuxtLink to="/" class="text-white hover:text-teal-300">Home</NuxtLink>
  </div>
    </nav>
    <slot />

    <footer class="p-6 flex flex-warp items-center justify-between bg-gray-800">
      <p class="text-gray-300">2024 Quiz</p>
      <div class="flex mt-6 md:mt-0 items-center space-x-4">
        
        <template v-if="userStore.user">
          <a href="#" @click.prevent="logout" class="py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl cursor-pointer">Log out</a>
        </template>

        <template v-else>
          <NuxtLink to="/login" class="py-4 px-6 bg-teal-900 hover:bg-teal-700 text-white rounded-xl">Log in</NuxtLink>
          <NuxtLink to="/signup" class="py-4 px-6 bg-teal-900 hover:bg-teal-700 text-white rounded-xl">Sign up</NuxtLink>
        </template>
        
      </div>
    </footer>
  </div>
</template>