<style scoped>
* {
    box-sizing: border-box;
}
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>

<template>
    <navbarVue />

    <RouterView />

    <footerVue />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import navbarVue from './components/功能/nav.vue'
import footerVue from './components/功能/footer.vue'
</script>
