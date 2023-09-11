<style scoped>
#all_container {
    text-align: center;
}
#second_container {
    max-width: 500px;
    text-align: center;
    margin: auto;
}
#show_level {
    width: 250px;
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
}
#data_content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding: 10px;
    font-family: 'Noto Sans TC', sans-serif;
}
.data_item {
    margin: 10px;
}
#progress_bar {
    width: 45vw;
    height: 10px;
    border: solid 1px #848484;
    border-radius: 10px;
}
#progress {
    height: 10px;
    border-radius: 10px;
    background-color: rgb(96, 197, 96);
}
#show_level img {
    width: 30px;
    height: 30px;
}
#medal {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 10px 0;
}
</style>

<template>
    <!-- 使用 Loading 组件 -->
    <LoadingSpinner :loading="loading" />
    <div id="all_container">
        <user_bannerVue />
        <breadcrumbVue />
        <user_functionVue />
    </div>

    <div id="second_container">
        <div id="show_level">
            <p v-if="currentAmount < 5000">累積消費金額可成為白銀會員</p>
            <p v-if="currentAmount >= 5000 && currentAmount < 10000">累積消費金額可成為黃金會員</p>
            <p v-if="currentAmount >= 10000">恭喜您成為黃金會員!</p>
            <div id="medal">
                <div id="progress_bar">
                    <div :style="{ width: progressBarWidth, 'max-width': '100%' }" id="progress"></div>
                </div>
            </div>
            <p v-if="currentAmount < 5000">{{ currentAmount }} / 5000</p>
            <p v-if="currentAmount >= 5000 && currentAmount < 10000">{{ currentAmount }} / 10000</p>
            <p v-if="currentAmount > 10000">10000 / 10000</p>
        </div>
        <div id="data_container">
            <div id="show_data">
                <div id="data_title">
                    <p>會員個人檔案</p>
                </div>
                <div id="data_content">
                    <div class="data_item">
                        <span>姓名：</span>
                        <span>{{ memberData.name }}</span>
                    </div>
                    <div class="data_item">
                        <span>帳號：</span>
                        <span>{{ memberData.account }}</span>
                    </div>
                    <div class="data_item">
                        <span>電話：</span>
                        <span>{{ memberData.phone }}</span>
                    </div>
                    <div class="data_item">
                        <span>電子信箱：</span>
                        <span>{{ memberData.mail }}</span>
                    </div>
                    <div class="data_item">
                        <span>會員等級：</span>
                        <template v-if="memberData.grade === 1">一般會員</template>
                        <template v-else-if="memberData.grade === 2">白銀會員</template>
                        <template v-else-if="memberData.grade === 3">黃金會員</template>
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
import { save_status, save_user_data } from '@/stores/counter'

const loading = ref(true)
const store_status = save_status()
const store_data = save_user_data()
const router = useRouter()
const memberData = ref({})
const currentAmount = ref(0) //顯示的金額初始值為0
const progressBarWidth = ref('0%')
console.log('pinia登入狀態::' + store_status.login_status)

//驗證登入狀態
if (!store_status.login_status) {
    alert('請先登入會員')
    router.push('/login_page')
}

const user_data = async () => {
    try {
        const response = await fetch('http://localhost:3000/stepbrothers/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const data = await response.json()

            console.log(data)
            store_data.save(data.grade, data.name) // 確保在此處調用 save 方法是正確的

            memberData.value = data
            currentAmount.value = memberData.value.purchase_CA
            console.log('pinia使用者名稱與等級::' + store_data.user_grade, store_data.user_name)

            if (currentAmount.value < 5000) {
                progressBarWidth.value = `${(currentAmount.value / 5000) * 100}%`
            }

            if (currentAmount.value >= 5000) {
                progressBarWidth.value = `${(currentAmount.value / 10000) * 100}%`
            }
        } else {
            console.log('載入時發生錯誤')
        }
    } catch (error) {
        console.error('載入時發生錯誤：', error)
    }
}

onMounted(() => {
    user_data()
    setTimeout(() => {
        loading.value = false
    }, 1000)
})
</script>
