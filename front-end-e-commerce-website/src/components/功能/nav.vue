<style scoped>
/* 共用的 CSS 規則（手機板和電腦都會套用） */
/* 手機板的 CSS 規則（和原先的樣式相同） */

#nav {
    position: fixed;
    background-color: black;
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: center;
    z-index: 2;
}

#nav img {
    width: 40px;
    height: 50px;
}
#nav1 {
    position: fixed;
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: flex-end;
    z-index: 2;
}

#nav1 img {
    width: 40px;
    height: 50px;
}

#home {
    display: none;
}

#user {
    display: none;
}
#about {
    display: none;
}

#logo {
    z-index: 5;
}

#logo img {
    width: 40px;
    height: 50px;
    justify-content: center;
}

#menu-toggle {
    display: none;
}
.menu-icon {
    display: block;
    cursor: pointer;
    padding: 15px 10px 10px 10px;
}

.menu-icon span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #ffffff;
    margin-bottom: 5px;
}

#menu-items {
    top: 100%;
    left: 0;
    background-color: #d2d2d2;
    padding: 20px 10px 10px 10px;
    list-style: none;
    position: fixed;
    top: 50px;
    right: 0;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease-in-out;
    position: fixed;
}
#menu-items.show {
    display: block;
    transform: translateY(0); /* 初始位置設為向下偏移 100% */
}
#menu-items li {
    margin: 10px;
}

#menu-items a {
    text-decoration: none;
}

#menu-items.show {
    display: block;
}

#cart img {
    width: 30px;
    height: 30px;
    margin: 10px 5px 0 0;
}

#categories {
    z-index: 2;
    display: flex;
    background-color: #d2d2d2;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    margin-top: 50px;
    position: fixed;
    width: 100%;
}

#categories a {
    text-decoration: none;
    font-family: 'Jockey One', sans-serif;
    padding: 0 5px;
    text-decoration: none;
    color: black;
    transition: background-color 0.3s, color 0.3s;
}

#categories a:hover {
    background-color: #000000;
    color: white;
}
#categories .space {
    width: 15px;
}

/* 電腦版的 CSS 規則 */
@media screen and (min-width: 768px) {
    #home {
        display: block; /* 顯示該區塊 */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #home img {
        width: 35px;
        height: 35px;
        /* padding: 5px 0 0 0; */
        margin-right: 10px;
    }
    #user {
        display: block; /* 顯示該區塊 */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #user img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
    }

    #about {
        display: block; /* 顯示該區塊 */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #about img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    .hamburger-menu {
        display: none; /* 隱藏漢堡選單的圖示 */
    }

    #menu-items {
        display: flex; /* 顯示選單項目 */
    }

    #categories #men {
        padding: 0 5px;
        font-size: 20px;
    }
    #categories #women {
        padding: 0 5px;
        font-size: 20px;
    }

    #categories #kids {
        padding: 0 5px;
        font-size: 20px;
    }
}
</style>

<template>
    <!-- 導覽 -->
    <div id="nav">
        <!-- Logo -->
        <div id="logo">
            <router-link to="/">
                <img src="\logo\logo.png" alt="" />
            </router-link>
        </div>
    </div>

    <div id="nav1">
        <!-- 回到首頁 -->
        <div id="home">
            <router-link to="/">
                <img src="\icon\home.png" alt="" />
            </router-link>
        </div>
        <!-- 關於我們 -->
        <div id="about">
            <router-link to="/about">
                <img src="\icon\book.png" alt="" />
            </router-link>
        </div>
        <!-- 會員中心 -->
        <div id="user">
            <router-link to="/user">
                <img src="\icon\user_white.png" alt="" />
            </router-link>
        </div>
        <!-- 購物車 -->
        <div id="cart">
            <router-link to="/shopping_car">
                <img src="\icon\shopping_cart_white.png" alt="" />
            </router-link>
        </div>
        <!-- 漢堡 -->
        <div class="hamburger-menu">
            <!-- <input type="checkbox" id="menu-toggle" v-model="isOpen" /> -->
            <label for="menu-toggle" class="menu-icon" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
        <!-- 彈出選單 -->
        <div>
            <ul id="menu-items" v-show="isOpen">
                <li><router-link to="/">首頁</router-link></li>
                <li><router-link to="/user">會員中心</router-link></li>
                <li><router-link to="/about">關於我們</router-link></li>
            </ul>
        </div>
        <!-- 分類 -->
        <div id="categories">
            <div id="men"><router-link to="/man">Men</router-link></div>
            <div class="space"></div>
            <div id="women"><router-link to="/woman">Women</router-link></div>
            <div class="space"></div>
            <div id="kids"><router-link to="/kids">kids</router-link></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../../router'

// 在路由切換時觸發事件
// import { router } from "../../router/index.js"; // 假設你的 Vue Router 實例命名為 router

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

router.beforeEach((to, from, next) => {
    // 在這裡處理彈出選單的自動收回邏輯
    // 將 isOpen.value 設為 false 來關閉彈出選單
    // 例如：
    isOpen.value = false
    next() // 繼續路由切換
})
</script>
