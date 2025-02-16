<template>
  <!-- 
    position: fixed で画面上部に固定。
    p-6 で内側に余白、w-full で幅100%、z-50 で重なり順を前面に。
  -->
  <header class="fixed top-0 left-0 w-full p-6 flex items-center justify-between bg-teal-800 z-50">
    <div class="flex items-center space-x-4">
      <NuxtLink to="/" class="text-white hover:text-teal-300">Home</NuxtLink>
    </div>
  </header>
</template>
