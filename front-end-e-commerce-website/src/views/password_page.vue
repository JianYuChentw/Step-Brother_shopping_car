<style scoped>
#all_container {
    text-align: center;
    height: 100vh;
    background-color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    font-family: 'Noto Sans TC', sans-serif;
}
#login_section {
    width: 80vw;
    height: 300px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 1%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 500px;
}
#account {
    margin: 15px 5px 15px 5px;
}
#phone {
    margin: 5px 5px 15px 5px;
}
.login_button {
    width: 150px; /* 設定寬度 */
    height: 30px; /* 設定高度 */
    border-radius: 3px; /* 設定角弧度 */
    text-align: center;
    cursor: pointer;
    line-height: 40px;
    color: #fff;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}
.login_button:hover {
    background-color: rgb(38 38 38);
}
.custom-input {
    border: none; /* 移除原本的邊框 */
    border-bottom: 1px solid #000; /* 設定底線樣式 */
    outline: none; /* 移除聚焦時的外框 */
    padding: 5px; /* 設定內部間距，以使底線與文字之間有一定間距 */
}
h5 {
    color: #8c8c8c;
    padding: 1 0px;
}
h5 a {
    color: #8c8c8c;
}
</style>

<template>
    <LoadingSpinner :loading="loading" />
    <div id="all_container">
        <div id="login_section">
            <div id="title"><h4>密碼查詢</h4></div>
            <form @submit.prevent="send">
                <div id="account">
                    <label for="account">請輸入您的會員帳號：</label>
                    <input type="text" id="account" v-model="user.account" class="custom-input" required />
                </div>
                <div id="phone">
                    <label for="phone">請輸入您的電話號碼：</label>
                    <input type="text" id="phone" v-model="user.phone" class="custom-input" required />
                </div>
                <button type="submit" class="login_button">送出</button>
            </form>
            <h5><router-link to="/login_page">前往登入頁面</router-link></h5>
        </div>
    </div>
</template>
<script setup>
import LoadingSpinner from '@/components/功能/loading.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const loading = ref(true)
const router = useRouter()
const user = ref({
    account: '',
    phone: '',
})
const send = async () => {
    try {
        const response = await fetch('http://localhost:3000/stepbrothers/submit_forget_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.value),
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            //判斷帳號或手機是否存在
            if (data.account_exist && data.user_phone) {
                alert('已將您的密碼發送至您的信箱，請查看郵件')
                router.push('/login_page')
            }
        } else {
            alert('送出時發生錯誤!請重試')
        }
    } catch (error) {
        alert('送出時發生錯誤!請重試')
        console.error('送出時發生錯誤', error)
    }
}

setTimeout(() => {
    loading.value = false
}, 1000)
</script>
