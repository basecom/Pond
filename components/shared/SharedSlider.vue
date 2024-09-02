<script setup lang="ts">
import { Swiper } from 'swiper/vue';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
</script>

<template>
    <swiper
        :slides-per-view="3"
        :slides-per-group="3"
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
    </swiper>
</template>

<style scoped>

</style>