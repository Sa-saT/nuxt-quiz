<script setup>
    // 変数
    const msg = 'Hello!'

    // 関数
    function log() {
        console.log(msg)
    }

</script>

<template>
  <button @click="log">{{ msg }}</button>
  <!-- <h2>user: {{ $route.params }}</h2> -->
</template>