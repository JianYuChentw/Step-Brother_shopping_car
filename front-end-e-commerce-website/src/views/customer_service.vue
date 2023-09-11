<style scoped>
/* 每頁都要加 */
#all_container {
    text-align: center;
}
#chat_container {
    display: flex;
    justify-content: center;
    height: 40vh;
    max-width: 700px;
    margin: auto;
}
#show_content {
    margin: 20px 0;
    width: 90vw;
    border: solid 1px #848484;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    overflow-y: auto;
    scroll-behavior: smooth; /* 這是關鍵，讓滾動具有平滑的動畫效果 */
}
.item {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
.chat-messages {
    max-height: 200px;
    font-family: 'Noto Sans TC', sans-serif;
}
.message {
    margin: 10px;
}
.user-message-container {
    display: flex;
    justify-content: flex-end;
}
.user-message {
    border: #ccc solid 1px;
    border-radius: 5px;
    padding: 5px;
    word-wrap: break-word;
    width: fit-content;
    max-width: 45%;
    font-size: 15px;
    margin: 5px 0;
}
.user-support-container {
    display: flex;
    justify-content: flex-start;
}
.support-message-container {
    width: fit-content;
    max-width: 45%;
    background-color: #d2d2d2;
    border-radius: 5px;
    padding: 5px;
}
.support-message {
    max-width: 100px;
    word-wrap: break-word; /* 新增這行 */
    font-size: 15px;
    /* margin: 100px; */
    padding: 3px;
}

.input-box {
    width: 90vw;
    max-width: 700px;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-bottom: 20px;
}
.input-box input {
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.input-box button {
    margin-left: 5px;
    padding: 5px 10px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.support-name {
    font-size: 8px;
    margin: 3px;
}
.support-message {
    cursor: pointer;
}
</style>

<template>
    <LoadingSpinner :loading="loading" />
    <div id="all_container">
        <user_bannerVue />
        <breadcrumbVue />
        <user_functionVue />
    </div>
    <div id="chat_container">
        <div id="show_content" ref="chatContainer">
            <div class="chat-messages">
                <div v-for="message in messages" :key="message.id" class="message" :id="message.id">
                    <div
                        :class="{
                            'user-message-container': message.isFromUser,
                            'support-message-container': !message.isFromUser,
                        }"
                        @click="handleMessageClick(message, message.id)"
                    >
                        <template v-if="!message.isFromUser">
                            <!-- <div class="support-name">SB客服 :</div>     -->
                        </template>

                        <span
                            :class="{
                                'user-message': message.isFromUser,
                                'support-message': !message.isFromUser,
                            }"
                            v-if="message.id"
                        >
                            {{ message.question }}
                        </span>

                        <span
                            :class="{
                                'user-message': message.isFromUser,
                                'support-message': !message.isFromUser,
                            }"
                            v-if="!message.id"
                        >
                            {{ message.text }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="input-box">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="請輸入訊息..." />
        <button @click="sendMessage">發送</button>
    </div>
</template>

<script setup>
import LoadingSpinner from '@/components/功能/loading.vue'
import user_functionVue from '@/components/功能/user_function.vue'
import user_bannerVue from '@/components/功能/user_banner.vue'
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { save_status, save_user_data } from '@/stores/counter' //引入pinia
import breadcrumbVue from '@/components/功能/breadcrumb.vue'
const loading = ref(true)
const store_status = save_status()
const router = useRouter()
const newMessage = ref('')
const data = ref('')
const chatContainer = ref(null)
const messages = ref([
    {
        text: '歡迎進入客服聊天室，請點選對話欄中相關問題，提供您解決方法。若上述回答無法解決您的問題，請洽詢本公司，會有專人為您服務。',
        isFromUser: false,
    },
])
const scrollToBottom = () => {
    // 在更新消息后滚动到底部
    nextTick(() => {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    })
}
const sendMessage = () => {
    if (newMessage.value.trim() === '') return
    messages.value.push({
        text: newMessage.value,
        isFromUser: true,
    })
    newMessage.value = ''
    scrollToBottom()
}
const handleMessageClick = (message, id) => {
    if (!id) {
        return
    }
    if (!message.isFromUser) {
        const responseMessage = {
            text: message.answer, // 新增回應的訊息內容
            isFromUser: false,
        }
        console.log(message)
        messages.value.push(responseMessage) // 新增回應訊息到 messages
        scrollToBottom()
    }
}

//驗證登入狀態
console.log('pinia登入狀態::' + store_status.login_status)
if (!store_status.login_status) {
    alert('請先登入會員')
    router.push('/login_page')
}

const support_data = async () => {
    try {
        const url = 'http://localhost:3000/stepbrothers/customer_service'
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
        data.value = await response.json()

        console.log(data.value)

        // 將客服回答新增到 messages 中
        data.value.service_question.forEach((item) => {
            messages.value.push({
                id: item.id,
                question: item.question,
                answer: item.answer,
                isFromUser: false,
            })
        })
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    // 當組件掛載後，模擬後端回傳的 JSON 資料
    support_data()
    setTimeout(() => {
        loading.value = false
    }, 1000)
})
</script>
