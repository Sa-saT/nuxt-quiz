<template>
    <div>
        <h1 v-if="user">ようこそ {{ user.name }}さん</h1>
        <div class="flex justify-center items-center h-screen bg-gray-100">
            <p class="text-2xl font-mono text-gray-800">
                <span>{{ displayedText }}</span><span class="blinking-cursor">|</span>
            </p>
        </div>
        <p>{{ $route.params.slug }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const user = computed(() => userStore.user)

// 変数
const msg = 'Test'
console.log(msg)

// 表示するテキストを定義
const text: string = 'Welcome to the ' + msg + ' ! Hello World!'
// 表示中のテキストを格納するリアクティブ変数
const displayedText = ref<string>('')
// 現在のインデックス
let index: number = 0

// タイプエフェクト関数
const typeEffect = () => {
  if (index < text.length) {
    displayedText.value += text[index]
    index++
    setTimeout(typeEffect, 100) // 文字を表示する間隔（ミリ秒）
  }
}
// console.log(localStorage.setItem('authToken', this.token))
// コンポーネントがマウントされたらエフェクトを開始
onMounted(() => {
  typeEffect()
})
</script>

<style scoped>
.blinking-cursor {
  display: inline-block;
  width: 1ch;
  background-color: transparent;
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
