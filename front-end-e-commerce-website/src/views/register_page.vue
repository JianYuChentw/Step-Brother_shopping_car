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
}
#register_section {
    width: 80vw;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 1%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 500px;
    margin: 80px 0 0 0;
    font-family: 'Noto Sans TC', sans-serif;
}

.input {
    margin: 20px;
}

.custom-input {
    border: none; /* 移除原本的邊框 */
    border-bottom: 1px solid #000; /* 設定底線樣式 */
    outline: none; /* 移除聚焦時的外框 */
    padding: 5px; /* 設定內部間距，以使底線與文字之間有一定間距 */
}

.register_button {
    background-color: black;
    color: white;
    border-radius: 3px; /* 設定角弧度 */
    width: 150px; /* 設定寬度 */
    height: 30px; /* 設定高度 */
    margin: 20px 0 0 0;
    border: none;
    cursor: pointer;
}

.register_button:hover {
    background-color: #4e4e4e;
}

h4 {
    margin: 15px;
}
h5 {
    color: #8c8c8c;
    margin: 10px;
}
h5 a {
    color: #8c8c8c;
}
</style>

<template>
    <LoadingSpinner :loading="loading" />
    <div id="all_container">
        <div id="register_section">
            <div id="title"><h4>請填入以下資訊</h4></div>
            <form @submit.prevent="register">
                <div id="username" class="input">
                    <label for="username">用戶名稱：</label>
                    <input
                        type="text"
                        id="username"
                        v-model="user.new_name"
                        class="custom-input"
                        required
                        minlength="2"
                        maxlength="15"
                        placeholder="2~15字元"
                    />
                </div>

                <div id="account" class="input">
                    <label for="account">用戶帳號：</label>
                    <input
                        type="text"
                        id="account"
                        v-model="user.new_account"
                        class="custom-input"
                        required
                        minlength="4"
                        maxlength="12"
                        placeholder="4~12字元"
                    />
                </div>
                <div id="password" class="input">
                    <label for="password">用戶密碼：</label>
                    <input
                        type="text"
                        id="password"
                        v-model="user.new_password"
                        class="custom-input"
                        required
                        minlength="4"
                        maxlength="12"
                        placeholder="4~12字元"
                    />
                </div>

                <div id="checkPassword" class="input">
                    <label for="checkPassword">確認密碼：</label>
                    <input
                        type="text"
                        id="checkPassword"
                        v-model="user.checkPassword"
                        class="custom-input"
                        required
                        minlength="4"
                        maxlength="12"
                        placeholder="請重複輸入密碼"
                    />
                </div>

                <div id="mail" class="input">
                    <label for="mail">電子信箱：</label>
                    <input
                        type="text"
                        id="mail"
                        v-model="user.new_email"
                        class="custom-input"
                        required
                        placeholder="請輸入有效的電子信箱"
                    />
                </div>

                <div id="phone" class="input">
                    <label for="phone">電話號碼：</label>
                    <input
                        type="text"
                        id="phone"
                        v-model="user.new_phone_number"
                        class="custom-input"
                        required
                        pattern="^[0-9]{10}$"
                        placeholder="請輸入有效的手機號碼"
                    />
                </div>

                <button type="submit" class="register_button">註冊</button>
            </form>
            <h5>已經有帳號了? <router-link to="/login_page">點此登入</router-link></h5>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/功能/loading.vue'
const router = useRouter()
const loading = ref(true)
const user = ref({
    new_name: '',
    new_account: '',
    new_password: '',
    checkPassword: '',
    new_email: '',
    new_phone_number: '',
})

const register = async () => {
    const { new_name, new_account, new_password, checkPassword, new_email, new_phone_number } = user.value

    if (new_password !== checkPassword) {
        alert('輸入的密碼不一致!')
        return
    }
    console.log(user.value)

    try {
        const response = await fetch('http://localhost:3000/stepbrothers/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.value),
        })

        if (response.ok) {
            const data = await response.json()
            if (!data.register_result) {
                alert('帳號、信箱或手機號碼已重複，請重新輸入!')
                return
            }
            console.log(data)
            alert('註冊成功!')
            router.push('/login_page')
        }
    } catch (error) {
        console.error('登入時發生錯誤：', error)
    }
}

setTimeout(() => {
    loading.value = false
}, 1000)
</script>
<div>
</div>
