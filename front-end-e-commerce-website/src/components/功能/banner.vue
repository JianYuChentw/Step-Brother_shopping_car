<style scoped>
.app {
    height: 150px;
    margin-top: 70px;
}
@media screen and (min-width: 768px) {
    .app {
        height: 400px;
        margin-top: 70px;
    }
}
</style>

<template>
    <div class="app">
        <Carousel
            :autoplay="true"
            :duration="5000"
            :initIndex="0"
            :direction="true"
            directionMode="always"
            :directionSize="20"
            directionColor="skyblue"
            :indicator="true"
            indicatorMode="always"
            indicatorColor=""
            indicatorActiveColor=""
            @before-moving="beforeMoving"
            @after-moving="afterMoving"
        >
            <CarouselItem v-for="(item, index) in data" :key="index" :idx="index">
                <img :src="item" />
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
    name: 'App',
    setup() {
        const state = reactive({
            data: ['banner/1.jpg', 'banner/2.jpg', 'banner/3.webp', 'banner/4.jpg', 'banner/5.webp'],
        })

        return {
            ...toRefs(state),
        }
    },
})
</script>
