<template>
  <!-- スマホ専用ローダー（PCでは非表示） -->
  <div v-if="isLoading" class="flex md:hidden fixed inset-0 z-50 pointer-events-none">
    <!-- 足跡の要素を繰り返し生成 -->
    <div
      v-for="(paw, index) in pawPrints"
      :key="index"
      class="absolute w-10 aspect-[249/209.32] opacity-0 animate-fadeInOut"
      :style="{
        top: paw.top,
        left: paw.left,
        transform: `rotate(${paw.rotation}deg)`,
        animationDelay: `${index * 0.2}s`,
      }"
    >
      <!-- 足跡アイコン（共通化されたコンポーネント） -->
      <BasePawIcon class="w-full h-full" :colorClass="'text-indigo-600'" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

// 外部から受け取るローディング状態
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})

// 足跡リストとインターバルID、交互制御用フラグ
const pawPrints = ref([])
const intervalId = ref(null)
let isLeft = true // 左右交互に切り替えるフラグ

// isLoading の状態を監視して生成のON/OFF切り替え
watch(() => props.isLoading, (loading) => {
  if (loading) {
    startGeneratingPaws()
  } else {
    stopGeneratingPaws()
  }
})

// 足跡生成処理（交互に片足ずつ）
function startGeneratingPaws() {
  if (intervalId.value) return // 二重生成防止
  intervalId.value = setInterval(() => {
    const x = isLeft ? 30 : 60 // 左:30%、右:60%
    const y = Math.random() * 80 + 10

  // 90度単位のベース + ブレ
  const baseAngles = [0, 90, 180, 270]
  const baseAngle = baseAngles[Math.floor(Math.random() * baseAngles.length)] ?? 0
  const variation = Math.random() * 30 - 15 // ±15度
  const rotation = baseAngle + variation

  const newPaw = {
    top: `${y}%`,
    left: `${x}%`,
    rotation
  }

    pawPrints.value.push(newPaw)

    // 2.2秒後に自動で削除
    setTimeout(() => {
      const index = pawPrints.value.indexOf(newPaw)
      if (index !== -1) pawPrints.value.splice(index, 1)
    }, 3000)

    isLeft = !isLeft // 交互に切り替え
  }, 800) // 0.5秒ごとに片足ずつ追加
}

// 足跡生成の停止とリセット
function stopGeneratingPaws() {
  clearInterval(intervalId.value)
  intervalId.value = null
  pawPrints.value = []
  // isLeft = true // 初期化
}

// コンポーネント破棄時にクリーンアップ
onBeforeUnmount(() => {
  stopGeneratingPaws()
})
</script>

<style scoped>
/* フェードイン → 表示 → フェードアウト のアニメーション */
@keyframes fadeInOut {
  0%   { opacity: 0.7; transform: scale(0.95); }
  20%  { opacity: 1; transform: scale(1); }
  80%  { opacity: 1; }
  100% { opacity: 0; transform: scale(1.1); }
}

.animate-fadeInOut {
  animation: fadeInOut 3.3s ease-in-out forwards;
  animation-fill-mode: both;
}
</style>
