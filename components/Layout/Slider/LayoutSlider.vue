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
        initialSlide?: number;
        allowTouchMove?: boolean;
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
        // eslint-disable-next-line vue/require-valid-default-prop
        breakpoints: {},
        init: false,
        verticalNavigation: false,
        thumbRef: null,
        initialSlide: 0,
        allowTouchMove: true,
    },
);

const sliderRef: Swiper = ref();
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
        <div
            class="relative"
            :class="classes"
        >
            <template v-if="navigationArrows">
                <div
                    ref="prevSlide"
                    class="absolute z-10 bg-gray-light bg-opacity-50"
                    :class="
                        verticalNavigation
                            ? 'left-1/2 top-0 flex w-full -translate-x-1/2 justify-center py-1 lg:py-2'
                            : 'left-5 top-1/2 -translate-y-1/2 px-1 py-6 sm:left-0 lg:px-2 lg:py-12'
                    "
                >
                    <FormKitIcon
                        :icon="verticalNavigation ? 'chevron-up' : 'chevron-left'"
                        class="block h-6 w-6 text-brand-primary"
                    />
                </div>

                <div
                    ref="nextSlide"
                    class="absolute z-10 bg-gray-light bg-opacity-50"
                    :class="
                        verticalNavigation
                            ? 'bottom-0 left-1/2 flex w-full -translate-x-1/2 justify-center py-1 lg:py-2'
                            : 'right-5 top-1/2 -translate-y-1/2 px-1 py-6 sm:right-0 lg:px-2 lg:py-12'
                    "
                >
                    <FormKitIcon
                        :icon="verticalNavigation ? 'chevron-down' : 'chevron-right'"
                        class="block h-6 w-6 text-brand-primary"
                    />
                </div>
            </template>

            <swiper-container
                ref="sliderRef"
                class="grid h-full w-full"
                :class="thumbRef ? thumbRef : `min-h-[${minHeight}px]`"
                :autoplay="autoSlide"
                :speed="speed"
                :pagination="navigationDots"
                :navigation="navigation"
                :loop="loop"
                :direction="direction"
                :space-between="spaceBetween"
                :slides-per-view="slidesPerView"
                :thumbs-swiper="thumbsSwiper"
                :breakpoints="breakpoints"
                :init="init"
                :initial-slide="initialSlide"
                :allow-touch-move="allowTouchMove"
            >
                <slot></slot>
            </swiper-container>
        </div>
    </ClientOnly>
</template>
