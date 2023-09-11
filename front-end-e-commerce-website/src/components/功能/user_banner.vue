<style scoped>
#banner {
    background-color: rgb(143, 143, 143);
    text-align: center;
    height: 250px;
    margin-top: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#user_data {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#user_data p {
    padding-bottom: 20px;
    font-family: 'Noto Sans TC', sans-serif;
}
#user_data a {
    text-decoration: none;
}
#user_icon {
    width: 100px;
    height: 100px;
    position: relative;
    left: 25px;
    border: solid 3px black;
    border-radius: 50%;
    background-color: white;
}

.medal {
    position: relative;
    right: 20px;
    top: 20px;
    width: 50px; /* 調整 #status_icon 的寬度 */
    height: 50px; /* 調整 #status_icon 的高度 */
}
.common {
    opacity: 0;
}

#name {
    padding: 20px 0 0 0;
}
</style>

<template>
    <div id="banner">
        <div id="user_data">
            <RouterLink to="/user/user_data"><p>前往個人檔案</p></RouterLink>
            <div id="icon">
                <img id="user_icon" src="\icon\user.png" alt="" />
                <img class="medal common" v-if="memberData.user_grade == 1" src="\icon\common.png" alt="" />
                <img class="medal" v-if="memberData.user_grade == 2" src="\icon\silver.png" alt="" />
                <img class="medal" v-if="memberData.user_grade == 3" src="\icon\golden.png" alt="" />
            </div>
            <div id="name">{{ memberData.user_name + ' ' + '您好!' }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { save_user_data } from '@/stores/counter' //引入pinia
const memberData = ref({})
const store_data = save_user_data() //將pinia用store變數宣告
memberData.value = store_data
// 用於保存後端傳過來的 JSON 資料，初始值為空物件

// 模擬後端回傳的 JSON 資料，你可以用真實的後端資料來取代這裡的模擬資料

onMounted(() => {
    // 當組件掛載後，模擬後端回傳的 JSON 資料
})
</script>
