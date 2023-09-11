<style scoped>
/* 每頁都要加 */
#all_container {
    text-align: center;
    /* max-width: 800px; */
}
#all_container h2 {
    margin-top: 100px;
    font-family: 'Noto Sans TC', sans-serif;
}
#car_container {
    display: flex;
    justify-content: center;
    max-width: 600px;
    margin: auto;
}
#show_car {
    margin: 20px 0;
    width: 95vw;
    max-width: 600px;
}
#title {
    text-align: center;
    display: flex;
    width: 85vw;
    max-width: 600px;
    font-family: 'Noto Sans TC', sans-serif;
}
#title li {
    width: 100px;
    font-size: 15px;
    list-style: none;
    margin: auto;
}
#shopping_cart {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 30px;
    border-bottom: 2px solid #000000;
    border-top: 2px solid #000000;
}
.item {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
.detail {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-family: 'Jockey One', sans-serif;
    font-family: 'Noto Sans TC', sans-serif;
}
#sum_money {
    border-top: solid #000000 1px;
}
#info_container {
    background-color: #d2d2d2;
    min-height: 400px;
}
.product_info {
    text-align: center;
    display: flex;
    margin: 30px 0 0 5px;
    width: 85vw;
    max-width: 600px;
    font-family: 'Jockey One', sans-serif;
    justify-content: center;
}
.product_info li {
    display: flex;
    width: 100px;
    margin: auto;
    justify-content: center;
}
.product_info img {
    width: 50px;
    height: 50px;
}
.product_name {
    font-size: 8px;
    text-align: center;
    align-items: center;
    flex-direction: column;
}
#trash_can {
    flex-direction: row-reverse;
    margin-left: 20px;
    cursor: pointer;
}
#trash_can img {
    width: 30px;
    height: 30px;
}
#info_container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5px;
}
#info_container h3 {
    margin-top: 20px;
    font-family: 'Noto Sans TC', sans-serif;
}
.info {
    width: 90vw;
    height: 200px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    margin: 20px 0;
    max-width: 600px;
}
#button {
    display: flex;
    justify-content: flex;
    width: 90vw;
    justify-content: flex-end;
    max-width: 600px;
}
#button button {
    background-color: black;
    color: white;
    border-radius: 3px;
    width: 100px;
    height: 30px;
    margin: 0 0 20px 0;
}
#sent {
    background-color: rgb(116, 116, 116);
    cursor: pointer;
}
.quantity_control {
    display: flex;
    align-items: center;
}
.quantity_control p {
    width: 20px;
}

@media screen and (min-width: 768px) {
}
</style>

<template>
    <LoadingSpinner :loading="loading" />
    <div id="all_container">
        <navVue />
        <h2>購物車</h2>
    </div>
    <div id="car_container">
        <div id="show_car">
            <div id="title">
                <li>品項:</li>
                <li>尺寸:</li>
                <li>價格:</li>
                <li>數量:</li>
                <li></li>
            </div>
            <div id="shopping_cart">
                <div v-if="!jsonData.shopping_cart" class="product_info">目前購物車無任何商品</div>
                <div v-for="product in jsonData.shopping_cart" :key="product.id" class="product_info">
                    <li class="product_name">
                        <img :src="get_S_Img(product)" alt="" />
                        {{ product.product_name }}
                    </li>
                    <li>{{ 'US:' + product.us_size }}</li>
                    <li>{{ product.price }}</li>
                    <li class="quantity_control">
                        <button @click="increaseQuantity(product.id)">+</button>
                        <p>{{ product.quantity }}</p>
                        <button @click="decreaseQuantity(product.id)">-</button>
                    </li>
                    <li id="trash_can" @click="delete_car(product.id)">
                        <img src="\icon\trash_can.png" alt="" />
                    </li>
                </div>
            </div>
        </div>
    </div>
    <div id="info_container">
        <h3>本次消費金額</h3>
        <div id="consume" class="info">
            <div id="money" class="detail">
                <p>金額:</p>
                <p>${{ money.original_total }}</p>
            </div>
            <div id="discount" class="detail">
                <p>會員折扣:</p>
                <p>-${{ money.original_total - money.final_total }}</p>
            </div>
            <div id="sum_money" class="detail">
                <p>總金額:</p>
                <!-- 後端給折扣後金額 -->
                <p>${{ money.final_total }}</p>
            </div>
        </div>
        <div id="button">
            <button @click="submit" id="sent">確認購買</button>
        </div>
    </div>
</template>

<script setup>
import LoadingSpinner from '@/components/功能/loading.vue'
import navVue from '@/components/功能/nav.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { save_status } from '@/stores/counter'
const loading = ref(true)
const store = save_status()
const router = useRouter()
const jsonData = ref([])
const money = ref({})
const submit = () => {
    router.push('/check_out')
}
//驗證登入狀態
console.log(store.login_status)
if (!store.login_status) {
    // 導回登入頁面
    alert('請先登入會員')
    router.push('/login_page')
}

const shopping_car_data = async () => {
    try {
        const url = 'http://localhost:3000/stepbrothers/shopping_car'

        const headers = {
            // 可以在這裡添加自定義的 headers
            'Content-Type': 'application/json', // 例如這裡設定請求的 Content-Type 為 JSON
        }

        const response = await fetch(url, {
            method: 'GET', // 使用 GET 方法
            credentials: 'include',
            headers: headers, // 設定 headers
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        jsonData.value = await response.json()
        money.value = jsonData.value.shopping_cart_sum
        console.log(jsonData.value)
        console.log(jsonData.value.shopping_cart_sum)
    } catch (error) {
        console.error('Error occurred while fetching products data:', error)
    }
}

const get_S_Img = (product) => {
    return `/products/${product.class}/${product.product_name}/S/1.webp`
    //需要根據後端回傳的資料改變
}

//修改畫面數量
const decreaseQuantity = async (productId) => {
    const product = findProductById(productId)
    if (product && product.quantity > 1) {
        product.quantity -= 1
        await update_shopping_car_quantity(product)
    }
}

const increaseQuantity = async (productId) => {
    const product = findProductById(productId)
    if (product) {
        product.quantity += 1
        await update_shopping_car_quantity(product)
    }
}

const findProductById = (productId) => {
    // 在 jsonData.shopping_cart 中尋找符合 productId 的商品物件
    for (const product of jsonData.value.shopping_cart) {
        if (product.id === productId) {
            return product
        }
    }
    return null // 若未找到則回傳 null
}

//修改後端數量
const update_shopping_car_quantity = async (product) => {
    try {
        const url = 'http://localhost:3000/stepbrothers/update_shopping_car_quantity' // 替換成後端 API 的 URL，並在 URL 中傳遞商品的 ID
        const headers = {
            // 可以在這裡添加自定義的 headers
            'Content-Type': 'application/json', // 例如這裡設定請求的 Content-Type 為 JSON
        }

        //取得要更新的資料
        const dataToUpdate = {
            shopping_car_id: product.id,
            quantity: product.quantity, // 將要更新的數量資料放在這裡
        }

        // 發送 PUT 請求
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dataToUpdate),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        jsonData.value = await response.json()
        console.log(jsonData.value.shopping_cart_sum)
        // window.location.reload()
        shopping_car_data() //重新讀取一次資料
    } catch (error) {
        console.error('Error occurred while fetching products data:', error)
    }
}

//刪除後端購物車商品資料
const delete_car = async (id) => {
    const confirmed = confirm('是否要刪除此購物車項目?')
    if (confirmed)
        try {
            const url = 'http://localhost:3000/stepbrothers/delete_car' // 替換成後端 API 的 URL
            const headers = {
                'Content-Type': 'application/json',
            }
            const del_data = {
                shopping_car_id: id,
            }
            const response = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(del_data),
            })
            alert('項目已成功刪除')
            window.location.reload()
            if (!response.ok) {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error('Error occurred while deleting product:', error)
            throw error // 讓上層的函式處理錯誤
        }
}
onMounted(() => {
    shopping_car_data()
    setTimeout(() => {
        loading.value = false
    }, 1500)
})
</script>
