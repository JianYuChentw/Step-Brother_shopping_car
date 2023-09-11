import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import piniaPersist from 'pinia-plugin-persist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from '@/App.vue'
import router from '@/router'
import Carousel from 'v3-carousel'
const pinia = createPinia()
// pinia.use(piniaPersist)
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(Carousel)
app.use(pinia)
app.mount('#app')
