<style scoped>
/* 麵包屑 */

.breadcrumb {
    display: flex;
    background-color: #f5f5f5; /* 修改背景顏色 */
    font-family: 'Jockey One', sans-serif;
    font-size: 14px; /* 調整字體大小 */
    padding: 10px; /* 調整上下 padding */
    box-sizing: border-box;
    text-align: center;
    border-bottom: 1px solid #ccc; /* 添加底部邊框 */
}
a {
    text-decoration: none;
    font-family: 'Noto Sans TC', sans-serif;
    margin: 0 0 0 5px;
    color: black;
}

a:hover {
    color: #929191;
}
.space {
    margin: 0 1px;
}
.router-link {
    margin: 0 5px; /* 調整鏈接之間的間距 */
    color: #333; /* 修改鏈接顏色 */
    transition: color 0.3s; /* 添加顏色過渡效果 */
}

.router-link:hover {
    color: #007bff; /* 修改鼠標懸停時的顏色 */
}
</style>
<template>
    <div class="breadcrumb">
        <router-link v-for="(item, index) in breadcrumbItems" :to="item.to" :key="index">
            {{ item.label }}
            <span class="space"></span>
            <span v-if="index < breadcrumbItems.length - 1"> / </span>
        </router-link>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbItems = computed(() => {
    const matched = route.matched
    const items = matched.map((routeRecord) => ({
        label: routeRecord.meta.breadcrumb || routeRecord.meta.title || 'Home',
        to: routeRecord.path,
    }))
    return items
})
</script>
