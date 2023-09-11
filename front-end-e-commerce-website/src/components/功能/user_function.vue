<style scoped>
#container {
    display: flex;
    justify-content: center; /* 將 #function_container 水平置中 */
    align-items: center; /* 將 #function_container 垂直置中 */
    max-width: 500px;
    margin: auto;
}
#function_container {
    display: flex;
    background-color: #d2d2d2;
    justify-content: center;
    width: 90vw;
    height: 15vh;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    margin: 20px 0;
}
.function {
    background-color: white;
    padding: 10px;
    display: flex;
    width: 50px;
    height: 50px;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
}
.function img {
    width: 30px;
    height: 30px;
    margin: auto;
}
.function p {
    font-size: 8px;
}
.function a {
    text-decoration: none;
    font-family: 'Noto Sans TC', sans-serif;
    color: black;
}
.function p:hover {
    color: #929191;
}
#logout {
    cursor: pointer; /* 将光标设置为手指图标 */
}
</style>

<template>
    <div id="container">
        <div id="function_container">
            <div id="update" class="function">
                <router-link to="/user/user_update_page" class="link-container">
                    <img src="\icon\config.png" alt="" />
                    <p>修改資料</p>
                </router-link>
            </div>

            <div id="history" class="function">
                <router-link to="/user/purchase_history" class="link-container">
                    <img src="\icon\shopping_bag.png" alt="" />
                    <P> 訂單詳情 </P>
                </router-link>
            </div>

            <div id="service" class="function">
                <router-link to="/user/customer_service" id="service">
                    <img src="\icon\message.png" alt="" />
                    <p>聯繫客服</p>
                </router-link>
            </div>

            <div id="logout" class="function" @click="logout">
                <img src="\icon\exit.png" alt="" />
                <p>登出</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { save_status, save_user_data } from '@/stores/counter' //引入pinia

import { useRouter } from 'vue-router'
const router = useRouter()
const store_status = save_status()
const store_data = save_user_data()
console.log('使用者資料::' + store_data.user_name, store_data.user_grade)

const logout = async () => {
    try {
        const response = await fetch('http://localhost:3000/stepbrothers/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error('登出失败')
        }
        // 登出成功后，可以执行一些前端操作，比如跳转到登录页面
        store_status.login_status = null
        store_data.save(null, null)
        router.push('/')
        alert('登出成功')
        console.log('登出成功')
    } catch (error) {
        console.error('登出失败：', error)
    }
}
</script>
