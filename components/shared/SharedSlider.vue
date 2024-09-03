<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { SwiperNavigation } from '#imports';
const swiper = ref();
console.log(swiper);
</script>

<template>
    <Swiper
        ref="swiper"
        :slides-per-view="3"
        :slides-per-group="3"
        :modules="[SwiperNavigation]"
        :navigation="true"
    >
        <slot></slot>
<!--        <swiper-slide>Slide 1</swiper-slide>-->
<!--        <swiper-slide>Slide 2</swiper-slide>-->
<!--        <swiper-slide>Slide 3</swiper-slide>-->
<!--        <swiper-slide>Slide 4</swiper-slide>-->
<!--        <swiper-slide>Slide 5</swiper-slide>-->
<!--        <swiper-slide>Slide 6</swiper-slide>-->
<!--        <swiper-slide>Slide 7</swiper-slide>-->
<!--        <swiper-slide>Slide 8</swiper-slide>-->
<!--        <swiper-slide>Slide 9</swiper-slide>-->
<!--        <swiper-slide>Slide 10</swiper-slide>-->
    </Swiper>
</template>

<style scoped>

</style>