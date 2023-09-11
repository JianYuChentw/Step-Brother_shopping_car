<style scoped>
#all_container {
    text-align: center;
}
h3 {
    margin-top: 20px;
}

#logo img {
    width: 250px;
    height: 250px;
}
.picture img {
    width: 300px;
    height: 150px;
}
.text {
    padding: 20px;
    width: 300px;
    margin: auto;
    font-family: 'Noto Sans TC', sans-serif;
}
@media screen and (min-width: 768px) {
    #logo img {
        width: 400px;
        height: 400px;
    }
    .picture img {
        width: 600px;
        height: 300px;
    }
    .text {
        width: 600px;
        margin: auto;
    }
}
</style>

<template>
    <LoadingSpinner :loading="loading" />
    <div id="all_container">
        <h3>品牌故事</h3>
        <div id="logo">
            <img src="\logo\logo2.png" alt="" />
        </div>

        <div id="picture_1" class="picture">
            <img src="\about\1.jpg" alt="" />
        </div>
        <div class="text">
            "Brothers"
            一詞體現了我們對於家庭的重視和團結的價值觀。兄弟情誼則象徵著彼此之間的互助與合作。作為品牌，我們希望成為顧客的好兄弟，以關懷、信任和忠誠為基礎，與顧客建立長久的關係。無論他們是運動愛好者、時尚青年還是工作專業人士，我們都將以家人的心態來回應他們的需求，提供最適合他們的鞋子和資訊。
        </div>
        <div id="picture_2" class="picture">
            <img src="\about\2.jpg" alt="" />
        </div>
        <div class="text">
            "Step"
            這個詞彙代表著我們鼓勵人們勇於踏出自己的舒適圈，追求他們的夢想和目標。這個品牌精神體現在我們對於創新、品質和設計的追求上。我們相信每一個人都有無限的潛力，只需要有勇氣踏出第一步，就能創造出非凡的成就。這也是我們所提供的鞋子的理念，我們的產品將提供舒適、時尚和耐用的選擇，讓每一位顧客在踏出的旅程中充滿自信和動力。
        </div>
        <div id="picture_3" class="picture">
            <img src="\about\3.jpg" alt="" />
        </div>
        <div class="text">
            作為品牌，我們的使命是通過提供優質的鞋子和服務，激勵和鼓舞人們實現他們的夢想。我們致力於打造一個充滿活力和共同成長的環境，與我們的顧客一同走過每一個關鍵時刻。無論是激勵運動員超越自己的極限、幫助專業人士在職場上更上一層樓，還是提供時尚舒適的選擇給每一位時尚愛好者，我們的目標是成為他們邁出步伐的夥伴。
        </div>
    </div>
</template>
<script setup>
import LoadingSpinner from '@/components/功能/loading.vue'
import { ref } from 'vue'
const loading = ref(true)
setTimeout(() => {
    loading.value = false
}, 1000)
</script>
