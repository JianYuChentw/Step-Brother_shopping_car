<style scoped>
#products_section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-width: 1000px;
    margin: auto;
}
#products_section img {
    width: 150px;
    height: 125px;
}
.products_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 10px;
    font-family: 'Noto Sans TC', sans-serif;
}
.products {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    height: fit-content;
}
.brand_name {
    margin: 10px 0 0 0;
}
.products_name {
    margin: auto;
    width: 150px;
}
.products_price {
    margin-top: 5px;
}

.routerlink {
    text-decoration: none;
    box-sizing: border-box;
}

@media screen and (min-width: 768px) {
    #products_section {
        max-width: 1000px;
    }
    .products_container {
        width: 30%;
    }
    #products_section img {
        width: 250px;
        height: 250px;
    }
    .products_name {
        width: 250px;
    }
}

@media screen and (min-width: 1080px) {
    #products_section img {
        width: 300px;
        height: 300px;
    }
}
</style>

<template>
    <bannerVue />
    <breadcrumbVue />
    <RouterView />
</template>

<script setup>
import bannerVue from '@/components/功能/banner.vue'
import breadcrumbVue from '@/components/功能/breadcrumb.vue'
import { ref, onMounted } from 'vue'
</script>
