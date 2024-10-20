<script setup>
    // 変数
    const msg = 'Hello!'

    console.log(msg)

</script>

<template>
    <div>
        <h1>{{ msg }}</h1>
        <h2>Top</h2>
        <p>{{ $route.params.slug }}</p>
    </div>
</template>