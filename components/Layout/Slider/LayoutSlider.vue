<script setup lang="ts">
withDefaults(
    defineProps<{
        autoSlide?: boolean;
        autoplayTimeout?: number;
        speed?: number;
        navigationDots?: boolean;
        navigationArrows?: boolean;
        displayMode?: string;
        minHeight?: string;
        classes?: string;
        loop?: boolean;
        direction?: string;
        spaceBetween?: number;
        slidesPerView?: number;
        thumbsSwiper?: string;
    }>(),
    {
        autoSlide: false,
        autoplayTimeout: 3000,
        speed: 300,
        navigationDots: true,
        navigationArrows: true,
        displayMode: 'cover',
        minHeight: '300',
        classes: null,
        loop: true,
        direction: 'horizontal',
        spaceBetween: 0,
        slidesPerView: 1,
        thumbsSwiper: null,
    },
);

// Main slider html object
const sliderRef = ref(null);

// Main slider swiper instance
useSwiper(sliderRef, {});
</script>

<template>
    <ClientOnly>
        <swiper-container
            ref="sliderRef"
            :class="classes ? classes.join(' ') + ` min-h-[${minHeight}px]` : `min-h-[${minHeight}px]`"
            :autoplay="autoSlide"
            :speed="speed"
            :pagination="navigationDots"
            :navigation="navigationArrows"
            :loop="loop"
            :direction="direction"
            :space-between="spaceBetween"
            :slides-per-view="slidesPerView"
            :thumbs-swiper="thumbsSwiper"
        >
            <slot></slot>
        </swiper-container>
    </ClientOnly>
</template>
