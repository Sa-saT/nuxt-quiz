  <template>
    <!-- 背景フェード（固定位置） -->
    <div v-if="isLoading" class="hidden md:flex fixed inset-0 bg-white bg-opacity-80 z-50 items-center justify-center">
      <!-- 足跡アニメーション -->
      <div class="relative rotate-90 ml-16 flex flex-col items-center justify-between"
           style="width: 10vw; height: 30vw; max-width: 120px; max-height: 360px;">
        <div
          v-for="n in 6"
          :key="n"
          class="w-full aspect-[249/209.32] opacity-0 animate-pawAnimation"
          :style="{
            animationDelay: `${(6 - n) * 0.25}s`,
            transform: n % 2 === 0 ? 'rotate(10deg) translate(125%, 0)' : 'rotate(-10deg)'
          }"
        >
          <BasePawIcon class="w-full h-full" :colorClass="'text-indigo-400'" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    isLoading: {
      type: Boolean,
      required: true
    }
  })
  </script>
  
  <style scoped>
  @keyframes pawAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  </style>
  