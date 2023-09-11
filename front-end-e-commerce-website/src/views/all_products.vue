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
    <LoadingSpinner :loading="loading" />
    <div id="products_section">
        <div v-for="product in jsonData" :key="product.id" class="products_container">
            <RouterLink :to="`/products/${product.id}`" class="routerlink">
                <div
                    class="products"
                    @mouseenter="setHoverState(product, true)"
                    @mouseleave="setHoverState(product, false)"
                >
                    <img v-if="hoverStates[product.id]" :src="get_M_Img2(product)" alt="" />
                    <img v-else :src="get_M_Img(product)" alt="" />
                </div>
                <div class="brand_name">{{ product.brand_name }}</div>
                <div class="products_name">{{ product.product_name }}</div>
                <div class="products_price">{{ '$' + product.price }}</div>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoadingSpinner from '@/components/功能/loading.vue'
/////////////////////////////////////////////////////////////
const loading = ref(true)
const jsonData = ref(null)
const hoverStates = ref({})

const setHoverState = (product, isHovered) => {
    hoverStates.value[product.id] = isHovered
}
//畫面中顯示的產品圖案
const get_M_Img = (product) => {
    return `/products/${product.class}/${product.product_name}/1.webp`
    //根據後端回傳的資料改變
}
const get_M_Img2 = (product) => {
    return `/products/${product.class}/${product.product_name}/2.webp`
    //根據後端回傳的資料改變
}

//獲取後端產品資料
const all_products = async () => {
    try {
        loading.value = true
        const url = 'http://localhost:3000/stepbrothers' // 替換成後端 API 的 URL
        // const url = './stepbrothers'
        const headers = {
            // 可以在這裡添加自定義的 headers
            'Content-Type': 'application/json', // 例如這裡設定請求的 Content-Type 為 JSON
        }
        const response = await fetch(url, {
            method: 'GET', // 使用 GET 方法
            headers: headers, // 設定 headers
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        jsonData.value = await response.json()
        // 在這裡處理從後端獲取的資料
        console.log(jsonData.value)

        setTimeout(() => {
            loading.value = false
        }, 1500)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    all_products()

    setTimeout(() => {
        loading.value = false
    }, 1500)
})
</script>
