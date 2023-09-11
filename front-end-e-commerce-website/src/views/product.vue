<style scoped>
#product_section {
    font-family: 'Noto Sans TC', sans-serif;
}
#product_large {
    display: flex;
    justify-content: center;
    margin: 80px 0 20px 0;
}
#product_large img {
    width: 300px;
    height: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
#s_product_container {
    display: flex;
    /* margin-top: 20px; */
    max-width: 300px;
    /* text-align: center; */
    margin: auto;
}
.product_s {
    margin: auto;
}
.product_s img {
    width: 80px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
#product_name {
    margin: 10px 0px 10px 0px;
}
#product_name p {
    text-align: center;
    font-size: 20px;
}
#discount {
    width: 300px;
    background-color: #eaeaea;
    margin: auto;
    padding: 10px;
    border-left: solid 3px black;
}

#discount li {
    list-style: none;
    margin: 10px;
}
.highlight {
    color: red;
}

#price {
    max-width: 500px;
    display: flex;
    margin: auto;
    justify-content: flex-end;
}
#price p {
    text-align: right;
    font-size: 25px;
    margin: 0 10px 10px 0;
}
#stock {
    display: flex;
    justify-content: center;
}
#option {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    position: relative;
    max-width: 400px;
    padding: 10px;
}
#cart_container {
    box-sizing: border-box;
    border: black solid 1px;
    border-radius: 10%;
    display: flex;
    justify-content: center;
    margin: 18px 10px 0 0;
    width: 60px;
    height: 40px;
    background-color: #000000;
    align-items: center;
    cursor: pointer;
}
#cart_container img {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
}
#story_background {
    background: -webkit-linear-gradient(171deg, rgb(146, 146, 146), rgb(255, 255, 255));
    background: linear-gradient(171deg, rgb(146, 146, 146), rgb(255, 255, 255));
    text-align: center;
    font-family: 'Noto Sans TC', sans-serif;
}
#story_background h3 {
    margin: 10px;
    padding-top: 10px;
}
#story_background h2 {
    margin: 10px;
    padding-top: 10px;
}
#story_background li {
    list-style: none;
}
#logo_2 img {
    width: 150px;
    height: 150px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
#story li {
    padding: 20px;
    max-width: 800px;
    margin: auto;
}
.input-field {
    width: 100px;
    height: 40px;
    padding: 8px;
    border: 1px solid #000000;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
}
.option_container {
    margin: auto;
}
@media screen and (min-width: 768px) {
    #product_section {
        padding-top: 20px;
        display: flex;
        justify-content: space-evenly;
        max-width: 900px;
        margin: auto;
    }
    #info_section {
        margin: 100px 0 0 50px;
    }
    #product_name {
        font-size: 50px;
    }
    #price {
        margin: 60px 0 0 0;
        justify-content: flex-end;
    }
    .option_container {
        margin: 10px;
    }
    #logo_2 img {
        width: 200px;
        height: 200px;
    }
    #discount {
        width: 550px;
    }
    #option {
        margin-right: 0px;
    }
}
</style>

<template>
    <LoadingSpinner :loading="loading" />
    <!-- 商品顯示區塊 -->
    <div id="product_section">
        <div id="img_section">
            <!-- 大圖片顯示 -->
            <div id="product_large"><img :src="get_L_Img" alt="" /></div>
            <!-- 小圖片顯示 -->
            <div id="s_product_container">
                <!-- for迴圈渲染圖片 -->
                <div v-for="num in 3" :key="num" :class="'product_s'">
                    <img v-if="get_S_Img(num)" :src="get_S_Img(num)" alt="" @click="changeImg(num)" />
                </div>
            </div>
        </div>
        <div id="info_section">
            <!-- 接資料商品名稱 -->
            <div id="product_name">
                <p>{{ shoes_data.brand_name + ' ' + shoes_data.product_name }}</p>
            </div>
            <!-- 優惠資訊 -->
            <div id="discount">
                <li>歡樂慶開幕！即日起至202X/08/07全館商品免運費</li>
                <li>消費更省心！滿<span class="highlight"> 5000 </span>元，即成為銀牌會員，瞬間享有9.5折優惠!</li>
                <li>追求更大優惠？滿<span class="highlight"> 10000 </span>元，將晉升為金牌會員，全站9折尊榮待遇！</li>
            </div>
            <!-- 接資料商品價格 -->
            <div id="price">
                <P
                    >網路價: <span class="highlight">{{ '$' + shoes_data.price }}</span></P
                >
            </div>
            <!-- 選擇區塊 -->
            <div id="option">
                <!-- 選擇尺寸 -->
                <div class="option_container">
                    <label for="size">尺寸 : </label>
                    <select id="size" v-model="selectedSize" class="input-field">
                        <option v-for="sizeObj in shoes_data.size_stock" :value="sizeObj.size" :key="sizeObj.size">
                            US: {{ sizeObj.size }}
                        </option>
                    </select>
                </div>
                <!-- 選擇數量 -->
                <div class="option_container">
                    <label for="quantity">庫存數量 : </label>
                    <select id="quantity" v-model="selectedQuantity" class="input-field">
                        <option v-for="quantity in availableStock" :value="quantity" :key="quantity">
                            {{ quantity }}
                        </option>
                    </select>
                </div>
                <!-- 加入購物車 -->
                <div id="cart_container" class="option_container" @click="addToCart">
                    <img src="\icon\shopping_cart_white.png" alt="" />
                </div>
            </div>
        </div>
    </div>
    <!-- 品牌精神 -->
    <div id="story_background">
        <h3>品牌精神</h3>
        <div id="logo_2"><img src="/logo/logo2.png" alt="" /></div>
        <div id="story">
            <h2>勇於踏出舒適圈 追求夢想和目標</h2>
            <li>
                我們的選品團隊精挑細選了來自世界各地的知名品牌和新興設計師的作品，不管是運動鞋、休閒鞋、商務鞋或其他款式，在StepBrothers有最優質的選擇，以滿足您的各種需求。
                我們承諾為您提供最佳的鞋子和購物體驗，成為您的忠實夥伴，幫助您踏出重要人生的一步。無論您的目標是什麼，無論你正處於人生的哪個階段，我們都希望能陪伴著您，為您的每一步提供舒適和自信。
            </li>
        </div>
    </div>
</template>

<script setup>
import LoadingSpinner from '@/components/功能/loading.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { save_status } from '@/stores/counter' //引入pinia
const loading = ref(true)
const store_status = save_status()
console.log('pinia登入狀態::' + store_status.login_status)
//路由設定
const route = useRoute()
const router = useRouter()
const shoesId = route.params.id
//鞋子圖片
let get_L_Img = ref('')
let Img = ref('')
// 鞋子資訊
const shoes_data = ref({})
// 選擇尺寸欄位
const selectedSize = ref('')
// 選擇數量欄位
const selectedQuantity = ref(null)

//根據不同尺寸庫存 顯示不同數量
const availableStock = computed(() => {
    if (!selectedSize.value) {
        return []
    }
    const selectedSizeObj = shoes_data.value.size_stock.find((sizeObj) => sizeObj.size === selectedSize.value)
    if (!selectedSizeObj) {
        return []
    }
    const maxQuantity = Math.min(selectedSizeObj.stock, 99)
    return Array.from({ length: maxQuantity + 1 }, (_, index) => index)
})

const addToCart = async () => {
    if (!selectedSize.value || !selectedQuantity.value) {
        // 如果尺寸或數量為空值，彈出提示窗
        alert('請選擇尺寸和數量')
        return
    }
    const data = {
        product_id: shoesId,
        product_size: selectedSize.value,
        quantity: selectedQuantity.value,
    }
    try {
        const response = await fetch(`http://localhost:3000/stepbrothers/${shoesId}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            const result = await response.json()
            //驗證登入狀態
            if (result.login_state === false) {
                alert('請先登入會員')
                router.push('/login_page')
                return
            }
            alert('成功加入購物車!')
            console.log(result)
            console.log(route.params.id)
        } else {
            console.error('Failed to add to cart.')
        }
    } catch (error) {
        console.error('Error occurred while adding to cart:', error)
    }
}

const get_shoes_data = async () => {
    try {
        const url = `http://localhost:3000/stepbrothers/${shoesId}`
        const headers = {
            'Content-Type': 'application/json', // 例如這裡設定請求的 Content-Type 為 JSON
        }
        const response = await fetch(url, {
            method: 'GET', // 使用 GET 方法
            headers: headers, // 設定 headers
        })
        if (response.ok) {
            shoes_data.value = await response.json()
            console.log(shoes_data.value)
            get_L_Img.value = `/products/${shoes_data.value.class}/${shoes_data.value.product_name}/1.webp`
        } else {
            console.error('Failed to fetch products data.')
        }
    } catch (error) {
        console.error('Error occurred while fetching products data:', error)
    }
}
const get_S_Img = (num) => {
    return `/products/${shoes_data.value.class}/${shoes_data.value.product_name}/${num}.webp`
}
//替換大圖顯示路徑
const changeImg = (num) => {
    get_L_Img.value = `/products/${shoes_data.value.class}/${shoes_data.value.product_name}/${num}.webp`
}

onMounted(() => {
    get_shoes_data()
    setTimeout(() => {
        loading.value = false
    }, 1500)
})
</script>
