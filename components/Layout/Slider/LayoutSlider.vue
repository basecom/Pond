<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

const props = withDefaults(defineProps<{
    autoSlide?: boolean;
    autoplayTimeout?: number;
    speed?: number;
    navigationDots?: boolean;
    navigationArrows?: boolean;
    displayMode?: string;
    minHeight?: string;
}>(),
    {
    autoSlide: false,
    autoplayTimeout: 3000,
    speed: 300,
    navigationDots: true,
    navigationArrows: true,
    displayMode: 'cover',
    minHeight: '300',
})

// Main slider html object
const sliderRef = ref(null);

    // Main slider swiper instance
    useSwiper(sliderRef, {

    });

</script>

<template>
    <ClientOnly>
            <swiper-container
                ref="sliderRef"
                class="m-6 w-full flex items-center justify-center cursor-grab"
                :class="'min-h-['+minHeight+'px]'"
                :autoplay="autoSlide"
                :speed="speed"
                :pagination="navigationDots"
                :navigation=" navigationArrows"
                :loop="true"
            >
                <slot></slot>
            </swiper-container>
    </ClientOnly>
</template>

