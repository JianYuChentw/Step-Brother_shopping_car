<style scoped>
/* 每頁都要加 */
#all_container {
    text-align: center;
}

#show_level {
    width: 60vw;
    height: 80px;
    padding: 10px;
    display: flex;
    justify-content: center;
    margin: auto;
    border: solid 1px #969696;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    flex-direction: column;
}

#data_container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
}
#show_data {
    margin: 20px 0;
    width: 90vw;

    border: solid 1px #848484;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
}
#data_title {
    background-color: #848484;
    text-align: center;
}
#data_content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    font-family: 'Noto Sans TC', sans-serif;
}
.data_item {
    margin: 10px;
}
#progress_bar {
    width: 200px;
    height: 10px;
    border: solid 1px #848484;
}

#show_level img {
    width: 30px;
    height: 30px;
}
#medal {
    display: flex;
    align-items: center;
}
input {
    border: none; /* 移除原本的邊框 */
    border-bottom: 1px solid #000; /* 設定底線樣式 */
    outline: none; /* 移除聚焦時的外框 */
    padding: 5px; /* 設定內部間距，以使底線與文字之間有一定間距 */
}

.update_button {
    background-color: black;
    color: white;
    border-radius: 3px; /* 設定角弧度 */
    width: 150px; /* 設定寬度 */
    height: 30px; /* 設定高度 */
    margin: 20px 0 0 0;
}
#button {
    text-align: center;
    padding-bottom: 10px;
}
</style>

<template>
    <div id="all_container">
        <user_bannerVue />
        <breadcrumbVue />
        <user_functionVue />
    </div>

    <div id="data_container">
        <div id="show_data">
            <div id="data_title">
                <p>修改個人檔案</p>
            </div>
            <div id="data_content">
                <form>
                    <div class="data_item">
                        <span>姓名：</span>
                        <span>{{ memberData.user_name }}</span>
                    </div>
                    <div class="data_item">
                        <span>帳號：</span>
                        <span>{{ memberData.user_account }}</span>
                    </div>
                    <div class="data_item">
                        <span>密碼：</span>
                        <input
                            type="password"
                            v-model="memberData.user_password"
                            required
                            minlength="4"
                            maxlength="12"
                        />
                    </div>
                    <!-- 確認密碼欄位 -->
                    <div class="data_item">
                        <span>確認密碼：</span>
                        <input
                            type="password"
                            v-model="confirmPassword"
                            required
                            minlength="4"
                            maxlength="12"
                            placeholder="請重複輸入密碼"
                        />
                    </div>
                    <div class="data_item">
                        <span>電話：</span>
                        <input v-model="memberData.user_phone_number" required pattern="^[0-9]{10}$" />
                    </div>
                    <div class="data_item">
                        <span>電子信箱：</span>
                        <input
                            v-model="memberData.user_email"
                            required
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            title="請輸入有效的電子信箱"
                        />
                    </div>
                </form>
            </div>
            <div id="button">
                <button type="button" class="update_button" @click="save_data">儲存資料</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import user_functionVue from '@/components/功能/user_function.vue'
import user_bannerVue from '@/components/功能/user_banner.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { save_status, save_user_data } from '@/stores/counter'
import breadcrumbVue from '@/components/功能/breadcrumb.vue'

const store_status = save_status()
const router = useRouter()
const memberData = ref({})
const confirmPassword = ref('')
console.log('pinia登入狀態::' + store_status.login_status)

//驗證登入狀態
if (!store_status.login_status) {
    alert('請先登入會員')
    router.push('/login_page')
}

const user_data = async () => {
    try {
        const url = 'http://localhost:3000/stepbrothers/update_user_data_page'
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = await fetch(url, {
            method: 'GET', // 使用 GET 方法
            headers: headers, // 設定 headers
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }
        memberData.value = await response.json()
        // 在這裡處理從後端獲取的資料
        console.log(memberData.value)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

// 儲存資料的函式
const save_data = async () => {
    const isFormValid = document.querySelector('form').checkValidity()
    if (!isFormValid) {
        alert('請確認輸入是否正確')
        return
    }
    //確認密碼一致
    if (memberData.value.user_password !== confirmPassword.value) {
        alert('密碼和確認密碼不一致，請重新輸入!')
        return
    }

    try {
        const url = 'http://localhost:3000/stepbrothers/submit_update_user_data' // 替換成後端 API 的 URL
        const headers = {
            'Content-Type': 'application/json',
        }

        // 取得要更新的資料
        const dataToUpdate = {
            change_password: memberData.value.user_password,
            change_phone_number: memberData.value.user_phone_number,
            change_email: memberData.value.user_email,
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(dataToUpdate),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }
        const jsonData = await response.json()
        console.log(jsonData)

        if (jsonData.change_result !== true) {
            alert('此電話號碼或電子信箱已被使用! 請重新輸入')
            return
        }
        alert('資料已成功儲存')
        window.location.reload()
    } catch (error) {
        console.error('Error occurred while fetching data:', error)
        alert('儲存資料時發生錯誤')
    }
}

onMounted(() => {
    user_data()
})
</script>
