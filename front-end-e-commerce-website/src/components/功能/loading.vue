<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50px;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 9999;
}

.loading-container img {
    width: 70px;
    height: 70px;
}

.loading-container span {
    margin-top: 10px;
    color: black;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 15px;
}

@media screen and (min-width: 768px) {
    .loading-container img {
        width: 100px;
        height: 100px;
    }

    .loading-container span {
        font-size: 20px;
    }
}
</style>

<template>
    <div class="loading-container" v-if="loading">
        <img src="/public/loading.gif" alt="Loading" />
        <span>讀取中...</span>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
    loading: Boolean,
})
</script>
