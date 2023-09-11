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
    padding: 30px 0 0 0;
    max-width: 500px;
}
#account {
    margin: 15px 5px 5px 5px;
}

#password {
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
    transition: all 0.3s linear;
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
    padding: 10px;
}
h5 a {
    color: #8c8c8c;
}
</style>

<template>
    <div id="all_container">
        <div id="login_section">
            <div id="title"><h4>請輸入帳號與密碼</h4></div>
            <form @submit.prevent="login">
                <div id="account">
                    <label for="account">帳號：</label>
                    <input
                        type="text"
                        id="account"
                        v-model="user.account"
                        class="custom-input"
                        required
                        minlength="4"
                        maxlength="12"
                    />
                </div>
                <div id="password">
                    <label for="password">密碼：</label>
                    <input
                        type="password"
                        id="password"
                        v-model="user.password"
                        class="custom-input"
                        required
                        minlength="4"
                        maxlength="12"
                    />
                </div>

                <button type="submit" class="login_button">登入</button>
            </form>
            <h5><router-link to="/password_page">忘記密碼</router-link></h5>
            <h5>沒有帳號嗎? <router-link to="/register_page">申請新帳號</router-link></h5>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { save_status } from '@/stores/counter' //引入pinia

const store_status = save_status()
const router = useRouter()
const user = ref({
    account: '',
    password: '',
})

console.log('pinia登入狀態::' + store_status.login_status)

//驗證登入狀態
// if (store_status.login_status) {
//     //如果已登入 導回首頁
//     router.push('/user')
// }

const login = async () => {
    try {
        const response = await fetch('http://localhost:3000/stepbrothers/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.value),
        })

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            if (data.login_status === false) {
                alert('登入失敗，請重檢查帳號與密碼')
                return
            }
            store_status.login()
            alert('登入成功!')
            router.push('/user')
        } else {
            // 在這裡處理登入失敗後的邏輯
            alert('登入時發生錯誤!請重試')
        }
    } catch (error) {
        alert('登入時發生錯誤!請重試')
        console.error('登入時發生錯誤：', error)
    }
}
</script>
