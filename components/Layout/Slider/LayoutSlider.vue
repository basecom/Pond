<script setup lang="ts">
import type Swiper from 'swiper';

const props = withDefaults(
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
        breakpoints?: object;
        init?: boolean;
        verticalNavigation?: boolean;
        thumbRef?: string;
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
        breakpoints: {},
        init: false,
        verticalNavigation: false,
        thumbRef: null,
    },
);

const sliderRef : Swiper = ref();
const prevSlide = ref(null);
const nextSlide = ref(null);
const navigation = props.navigationArrows ? ref(null) : false;

watch([prevSlide, nextSlide, sliderRef], ([prevSlideValue, nextSlideValue]) => {
    if (prevSlideValue && nextSlideValue && props.navigationArrows) {
        const swiperParams = {
            navigation: {
                prevEl: prevSlideValue,
                nextEl: nextSlideValue,
            },
        };

        Object.assign(sliderRef.value, swiperParams);
    }

    sliderRef.value.initialize();
});
</script>

<template>
    <ClientOnly>
        <div class="relative" :class="classes">
            <template v-if="navigationArrows">
                <div
                    ref="prevSlide"
                    class="absolute z-10 bg-gray-light bg-opacity-50"
                    :class="verticalNavigation ? 'left-1/2 -translate-x-1/2 top-0 py-1 lg:py-2 w-full flex justify-center' : 'top-1/2 -translate-y-1/2 left-5 sm:left-0 py-6 lg:py-12 px-1 lg:px-2'"
                >
                    <FormKitIcon
                        :icon="verticalNavigation ? 'chevron-up' : 'chevron-left'"
                        class="block h-6 w-6 text-brand-primary"
                    />
                </div>

                <div
                    ref="nextSlide"
                    class="absolute z-10 bg-gray-light bg-opacity-50"
                    :class="verticalNavigation ? 'left-1/2 -translate-x-1/2 bottom-0 py-1 lg:py-2 w-full flex justify-center' : 'top-1/2 -translate-y-1/2 right-5 sm:right-0 py-6 lg:py-12 px-1 lg:px-2'"
                >
                    <FormKitIcon
                        :icon="verticalNavigation ? 'chevron-down' : 'chevron-right'"
                        class="block h-6 w-6 text-brand-primary"
                    />
                </div>
            </template>

            <swiper-container
                ref="sliderRef"
                class="h-full w-full grid"
                :class="thumbRef ? thumbRef : `min-h-[${minHeight}px]`"
                :autoplay="autoSlide"
                :speed="speed"
                :pagination="navigationDots"
                :navigation="navigationArrows"
                :loop="loop"
                :direction="direction"
                :space-between="spaceBetween"
                :slides-per-view="slidesPerView"
                :thumbs-swiper="thumbsSwiper"
                :breakpoints="breakpoints"
                :init="init"
            >
                <slot></slot>
            </swiper-container>
        </div>
    </ClientOnly>
</template>
