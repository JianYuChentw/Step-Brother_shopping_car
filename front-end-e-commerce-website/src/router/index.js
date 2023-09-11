import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import product from '../views/product.vue'
import about from '../views/about.vue'
import all_products from '../views/all_products.vue'
import man from '../views/man.vue'
import woman from '../views/woman.vue'
import kids from '../views/kids.vue'
import login_page from '../views/login_page.vue'
import user_update_page from '../views/user_update_page.vue'
import customer_service from '../views/customer_service.vue'
import purchase_history from '../views/purchase_history.vue'
import user_data from '../views/user_data.vue'
import register_page from '../views/register_page.vue'
import shopping_car from '../views/shopping_car.vue'
import check_out from '../views/check_out.vue'
import password_page from '../views/password_page.vue'

//--------------------------------------我是分隔線----------------------------------------//

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/', //!前往路徑名稱 routerlink to="/" << to就是塞path
            name: 'home', //! name為該page的名稱可以自行設定
            redirect: '/all_products',
            component: home, //!為該rotuer頁面你要讓它顯示的組件，也就是網頁樣式，他會尋找該vue檔，然後進行顯示
            meta: {
                title: 'home', // 頁面標題
                breadcrumb: '首頁', // 麵包屑標題
            },
            children: [
                {
                    path: '/all_products', //!男款
                    name: 'all_products',
                    component: all_products,
                    meta: {
                        title: 'all_products', // 頁面標題
                        breadcrumb: '全部商品', // 麵包屑標題
                    },
                },
                {
                    path: '/man', //!男款
                    name: 'man',
                    component: man,
                    meta: {
                        title: 'man', // 頁面標題
                        breadcrumb: '男鞋', // 麵包屑標題
                    },
                },
                {
                    path: '/woman', //!女款
                    name: 'woman',
                    component: woman,
                    meta: {
                        title: 'woman', // 頁面標題
                        breadcrumb: '女鞋', // 麵包屑標題
                    },
                },
                {
                    path: '/kids', //!童款
                    name: 'kids',
                    component: kids,
                    meta: {
                        title: 'kids', // 頁面標題
                        breadcrumb: '童鞋', // 麵包屑標題
                    },
                },
                {
                    path: '/about', //!關於我們
                    name: 'about',
                    component: about,
                    meta: {
                        title: 'about', // 頁面標題
                        breadcrumb: '關於我們', // 麵包屑標題
                    },
                },
            ],
        },
        {
            path: '/products/:id', //!鞋款商品介紹
            name: 'products',
            component: product,
        },

        {
            path: '/login_page', //!登入
            name: 'login_page',
            component: login_page,
        },
        {
            path: '/register_page', //!註冊
            name: 'register_page',
            component: register_page,
        },
        {
            path: '/user', //!會員中心
            name: 'user_center',
            redirect: '/user/user_data',
            meta: { title: '會員中心' },
            children: [
                {
                    path: 'user_data', //! 個人檔案
                    name: 'user_data',
                    component: user_data,
                    meta: { title: '個人檔案' },
                },
                {
                    path: 'user_update_page', //! 修改資料
                    name: 'user_update_page',
                    component: user_update_page,
                    meta: { title: '修改資料' },
                },
                {
                    path: 'customer_service', //!聯繫客服
                    name: 'customer_service',
                    component: customer_service,
                    meta: { title: '聯繫客服' },
                },
                {
                    path: 'purchase_history', //!訂單詳情
                    name: 'purchase_history',
                    component: purchase_history,
                    meta: { title: '訂單詳情' },
                },
            ],
        },
        {
            path: '/shopping_car', //!購物車
            name: 'shopping_car',
            component: shopping_car,
        },
        {
            path: '/check_out', //!結帳頁面
            name: 'check_out',
            component: check_out,
        },

        {
            path: '/password_page', //!結帳頁面
            name: 'password_page',
            component: password_page,
        },
    ],
})

export default router
