<template>
  <div class="min-h-screen relative pt-[80px] pb-[80px] px-4">
    <Header />
    <main>
      <slot />
      <div class="flex flex-col min-h-screen"></div>
    </main>
    <Footer />
  </div>
</template>