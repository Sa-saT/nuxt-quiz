<template>
  <!--
    position: fixed で画面下部に固定。
    p-6 で内側に余白、flex-warp → おそらく flex-wrap のタイポなら修正する。
    z-50 で前面に出す。
  -->
  <footer class="fixed bottom-0 left-0 w-full p-6 flex flex-wrap items-center justify-between bg-gray-800 z-50">
    <p class="text-gray-300">2024 Quiz</p>
    <div class="flex mt-6 md:mt-0 items-center space-x-4">
      
      <template v-if="userStore.user">
        <a href="/index.html" @click.prevent="logout" class="py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl cursor-pointer">
          Log out
        </a>
      </template>

      <template v-else>
        <NuxtLink
        v-if="!isLoginPage"
        to="/login" class="py-4 px-6 bg-teal-900 hover:bg-teal-700 text-white rounded-xl">Log in</NuxtLink>
        <NuxtLink
        v-if="!isSignUp" 
        to="/signup" class="py-4 px-6 bg-teal-900 hover:bg-teal-700 text-white rounded-xl">Sign up</NuxtLink>
      </template>

    </div>
  </footer>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()

// 現在のパスが '/login' なら true、それ以外なら false
const isLoginPage = computed(() => route.name === 'login')
const isSignUp = computed(() => route.name === 'signup')
function logout() {
    userStore.logout();
    navigateTo('/');
}
</script>