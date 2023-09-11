<style scoped>
* {
    padding-inline-start: initial;
}
/* 每頁都要加 */
#all_container {
    text-align: center;
}

#history_container {
    display: flex;
    justify-content: center;
    /* height: 40vh; */
    margin: auto;
    max-width: 500px;
}
#show_history {
    margin: 20px 0 23px 0;
    width: 90vw;
    border: solid 1px #848484;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
}
#title {
    background-color: #848484;
    text-align: center;
    display: flex;
    width: 100%;
    padding: 5px 0;
}

#title p {
    font-size: 15px;
    margin: auto;
    font-family: 'Noto Sans TC', sans-serif;
    width: 100px;
}
#history_content {
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
    font-family: 'Noto Sans TC', sans-serif;
    margin: 10px;
}
.container1 {
    display: flex;
}

.container2 {
    display: flex;
}
.item {
    display: flex;
    border-bottom: 1px solid #ccc;
    align-items: center;
    width: 100%;
    flex-direction: column;
    padding: 0 0 10px 0;
}
.detail {
    width: 100px;
    font-size: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    padding: 10px 0;
}

.detail button {
    width: fit-content;
}

.detail_info {
    display: flex;
    flex-direction: column;
}

.products_title {
    display: flex;
    background-color: #b8b8b8;
    margin: auto;
}
.products_title li {
    width: 100px;
}

.products_info {
    display: flex;
}
.products_info li {
    width: 100px;
    border-bottom: solid 1px #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
}

li {
    list-style: none; /* 移除默认的列表样式 */
}
.cancel {
    margin: 3px;
    font-size: 10px;
    color: #848484;
    text-decoration: underline;
    cursor: pointer; /* 将光标设置为手指图标 */
}

.cancel:hover {
    color: red; /* 在鼠标移动到区块上时改变文字颜色 */
}

@media screen and (min-width: 768px) {
    #show_history {
        max-width: 500px;
    }
}
</style>

<template>
    <LoadingSpinner :loading="loading" />
    <div id="all_container">
        <user_bannerVue />
        <breadcrumbVue />
        <user_functionVue />
    </div>
    <div id="history_container">
        <div id="show_history">
            <div id="title">
                <p>訂單日期</p>
                <p>訂單編號</p>
                <p>訂單金額</p>
                <p>訂單狀態</p>
                <p></p>
            </div>
            <div id="history_content">
                <div v-for="item in data" :key="item.id" class="item">
                    <div class="container1">
                        <div class="detail">{{ formatDate(item.time) }}</div>
                        <div class="detail">{{ item.id }}</div>
                        <div class="detail">{{ item.sum }}</div>
                        <div v-if="item.purchases[0].purchase_status === 1" class="detail">
                            準備中 <span class="cancel" @click="cancelOrder(item.time, item.id)">取消訂單</span>
                        </div>
                        <div v-if="item.purchases[0].purchase_status === 2" class="detail">審核中</div>
                        <div v-if="item.purchases[0].purchase_status === 3" class="detail">已取消</div>
                        <div v-if="item.purchases[0].purchase_status === 4" class="detail">已出貨</div>
                        <div class="detail">
                            <button @click="toggleDetail(item.id)">
                                {{ showDetail[item.id] ? '收合' : '展開' }}
                            </button>
                        </div>
                    </div>

                    <div class="container2">
                        <div v-if="showDetail[item.id]" class="detail_info">
                            <ul class="products_title">
                                <li>名稱</li>
                                <li>價格</li>
                                <li>尺寸</li>
                                <li>數量</li>
                            </ul>
                            <div v-for="obj in item.purchases" :key="obj.id" class="products">
                                <ul class="products_info">
                                    <li>{{ obj.product_name }}</li>
                                    <li>{{ obj.price }}</li>
                                    <li>{{ obj.size }}</li>
                                    <li>{{ obj.quantity }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import LoadingSpinner from '@/components/功能/loading.vue'
import user_functionVue from '@/components/功能/user_function.vue'
import user_bannerVue from '@/components/功能/user_banner.vue'
import breadcrumbVue from '@/components/功能/breadcrumb.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { save_status, save_user_data } from '@/stores/counter' //引入pinia
const loading = ref(true)
const store_status = save_status()
const router = useRouter()
const data = ref({})
const showDetail = ref({})

//驗證登入狀態
console.log('pinia登入狀態::' + store_status.login_status)
if (!store_status.login_status) {
    alert('請先登入會員')
    router.push('/login_page')
}

const toggleDetail = (id) => {
    showDetail.value[id] = !showDetail.value[id]
}

// 模擬後端回傳的 JSON 資料，你可以用真實的後端資料來取代這裡的模擬資料
const history_data = async () => {
    try {
        const url = 'http://localhost:3000/stepbrothers/purchase_history'
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
        const temp = await response.json()
        data.value = temp.reverse()
        console.log(...data.value)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

const formatDate = (datetime) => {
    const date = new Date(datetime)
    return date.toLocaleDateString() // 取得日期部分並轉換成本地時間格式
}

const cancelOrder = async (time, id) => {
    const userConfirmed = confirm(`確定要取消編號${id}的訂單嗎?`)
    if (!userConfirmed) {
        return
    }

    const cancel_data = {
        id: id,
        time: time,
    }

    try {
        const url = 'http://localhost:3000/stepbrother/cancel_order'
        const headers = {
            'Content-Type': 'application/json',
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(cancel_data),
        })

        if (response.ok) {
            const test = await response.json()
            console.log(test)
            window.location.reload()
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    // 當組件掛載後，模擬後端回傳的 JSON 資料
    history_data()
    setTimeout(() => {
        loading.value = false
    }, 1000)
})
</script>
