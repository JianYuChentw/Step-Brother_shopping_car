<style scoped>
/* 每頁都要加 */
#all_container {
    text-align: center;
}

#all_container h2 {
    margin-top: 100px;
    font-family: 'Noto Sans TC', sans-serif;
}

#car_container {
    display: flex;
    justify-content: center;
    /* height: 40vh; */
}

#show_car {
    margin: 20px 0;
    width: 95vw;
    max-width: 600px;
}

#title {
    text-align: center;
    display: flex;
    padding: 5px 15px;
    width: 83vw;
    margin-right: 50px;
    max-width: 600px;
    font-family: 'Noto Sans TC', sans-serif;
}

#title p {
    font-size: 15px;
    margin: auto;
}

#shopping_cart {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border-bottom: 2px solid #000000;
    border-top: 2px solid #000000;
    max-width: 600px;
    font-family: 'Noto Sans TC', sans-serif;
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
}

#sum_money {
    border-top: solid #000000 1px;
}

#info_container {
    background-color: #d2d2d2;
    font-family: 'Noto Sans TC', sans-serif;
}

.product_info {
    text-align: center;
    display: flex;
    justify-content: space-between;
    /* padding: 5px 15px; */
    /* padding-top: 30px; */
    width: 90vw;
    max-width: 600px;
}

.product_info p {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100px;
    justify-self: center;
    /* padding: 0 8px; */
}

.product_info img {
    width: 50px;
    height: 50px;
}

.product_name {
    font-size: 8px;
    text-align: center;
    display: flex;
    align-items: center;
}

#info_container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#info_container h3 {
    margin-top: 20px;
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

#order {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
#customer {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.input {
    margin: 30px;
}
#button {
    display: flex;
    /* justify-content: flex;    */
    width: 90vw;
    justify-content: space-between;
    max-width: 600px;
}
#button button {
    border-radius: 3px;
    width: 100px;
    height: 30px;
    margin: 0 0 20px 0;
    cursor: pointer;
}

#sent {
    background-color: rgb(0, 0, 0);
    color: white;
}
input {
    border: none; /* 移除原本的邊框 */
    border-bottom: 1px solid #000; /* 設定底線樣式 */
    outline: none; /* 移除聚焦時的外框 */
    padding: 5px; /* 設定內部間距，以使底線與文字之間有一定間距 */
}
</style>

<template>
    <LoadingSpinner :loading="loading" />
    <div id="all_container">
        <navVue />
        <h2>本次購買商品</h2>
    </div>
    <div id="car_container">
        <div id="show_car">
            <div id="title">
                <p>品項:</p>
                <p>尺寸:</p>
                <p>價格:</p>
                <p>數量:</p>
            </div>
            <div id="shopping_cart">
                <div v-for="product in jsonData.shopping_cart" :key="product.id" class="product_info">
                    <p class="product_name">
                        <img :src="get_S_Img(product)" alt="" />
                        {{ product.product_name }}
                    </p>
                    <p>{{ 'US:' + product.us_size }}</p>
                    <p>{{ product.price }}</p>

                    <p>{{ product.quantity }}</p>
                </div>
            </div>
        </div>
    </div>
    <div id="info_container">
        <h3>本次消費金額</h3>
        <!-- 後端傳送金額 -->
        <div id="consume" class="info">
            <div id="money" class="detail">
                <p>金額:</p>
                <p>${{ money.original_total }}</p>
            </div>
            <div id="discount" class="detail">
                <p>會員折扣:</p>
                <p>${{ money.original_total - money.final_total }}</p>
            </div>
            <div id="sum_money" class="detail">
                <p>總金額:</p>
                <p>${{ money.final_total }}</p>
            </div>
        </div>
        <h3>訂購人資料</h3>
        <div id="order" class="info">
            <div id="name" class="member">
                <label for="name_input">會員姓名：</label>
                <input type="text" id="name_input" v-model="jsonData.user_name" readonly />
            </div>
            <div id="phone" class="member">
                <label for="phone_input">會員電話：</label>
                <input type="text" id="phone_input" v-model="jsonData.user_phone" readonly />
            </div>
            <div id="email" class="member">
                <label for="email_input">會員信箱：</label>
                <input type="text" id="email_input" v-model="jsonData.user_mail" readonly />
            </div>
        </div>
        <h3>填寫取貨人資料</h3>
        <div id="customer" class="info">
            <form @submit.prevent="submit_shopping_car">
                <div id="username" class="input">
                    <label for="username">取貨人姓名：</label>
                    <input
                        type="text"
                        id="username"
                        v-model="user.recipient_name"
                        class="custom-input"
                        required
                        minlength="2"
                        maxlength="15"
                        placeholder="2~15字元"
                    />
                </div>
                <div id="phone" class="input">
                    <label for="phone">取貨人電話：</label>
                    <input
                        type="text"
                        id="phone"
                        v-model="user.recipient_phone"
                        class="custom-input"
                        required
                        pattern="^[0-9]{10}$"
                        placeholder="請輸入有效的手機號碼"
                    />
                </div>
                <div id="adress" class="input">
                    <label for="adress">取貨人地址：</label>
                    <input
                        type="text"
                        id="adress"
                        v-model="user.recipient_address"
                        class="custom-input"
                        required
                        placeholder="請輸入住家地址"
                    />
                </div>
            </form>
        </div>
        <div id="button">
            <button @click="back" id="back">回上頁</button>
            <button @click="submit_shopping_car" id="sent">送出</button>
        </div>
    </div>
</template>

<script setup>
import LoadingSpinner from '@/components/功能/loading.vue'
import navVue from '@/components/功能/nav.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { save_status } from '@/stores/counter' //引入pinia
const loading = ref(true)
const store_status = save_status()
const router = useRouter()
const jsonData = ref([])
const money = ref({})
const user = ref({
    recipient_name: '',
    recipient_phone: '',
    recipient_address: '',
    mail: '',
})
const get_S_Img = (item) => {
    return `/products/${item.class}/${item.product_name}/1.webp`
    //需要根據後端回傳的資料改變
}

//驗證登入狀態
if (!store_status.login_status) {
    alert('請先登入會員')
    // 導回登入頁面
    router.push('/login_page')
}

// 模擬後端回傳的 JSON 資料，你可以用真實的後端資料來取代這裡的模擬資料
const check_out = async () => {
    try {
        const url = 'http://localhost:3000/stepbrothers/check_out' // 替換成後端 API 的 URL
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

        const data = await response.json()
        jsonData.value = data
        console.log(jsonData.value)

        //若購物車沒有商品，導回購物車頁面
        if (!jsonData.value.shopping_cart) {
            router.push('/shopping_car')
        }

        money.value = jsonData.value.shopping_cart_sum
        // 在資料取得後更新 user 物件中的 user_mail 值
        user.value.mail = jsonData.value.user_mail
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

//回購物車
const back = () => {
    router.push('/shopping_car')
}
//送出訂單
const submit_shopping_car = async () => {
    await check_out()
    console.log(user.value)
    if (
        !user.value.recipient_name ||
        !user.value.recipient_phone ||
        !user.value.recipient_address ||
        !user.value.mail
    ) {
        alert('請填寫所有資料!')
        return
    }
    try {
        const response = await fetch('http://localhost:3000/stepbrothers/submit_shopping_car', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.value), // 將 user.value 放入 body 中
        })

        if (response.ok) {
            const data = await response.json()
            // 在這裡處理成功回應的邏輯
            if (!data.order_result) {
                alert('商品庫存不足，請檢查購買商品數量!')
                return
            }
            console.log('訂單提交成功:', data)
            alert('感謝您的購買，將儘速為您處理訂單!')
            router.push('/')
        } else {
            // 在這裡處理失敗回應的邏輯
            console.error('訂單提交失敗')
        }
    } catch (error) {
        console.error('訂單提交時發生錯誤：', error)
    }
}

onMounted(() => {
    check_out()

    setTimeout(() => {
        loading.value = false
    }, 1000)
})
</script>
