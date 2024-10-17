<script setup lang="ts">
const props = defineProps<{
    element: CmsElementProductSlider;
}>();

const config = useCmsElementConfig(props.element);
const elementData = useCmsElementData(props.element);

const border = config.getConfigValue('border');
const boxLayout = config.getConfigValue('boxLayout');
const displayMode = config.getConfigValue('displayMode');
const minWidth = config.getConfigValue('elMinWidth');
const navigation = config.getConfigValue('navigation');
const title = config.getConfigValue('title');
const autoSlide = config.getConfigValue('rotate');

const slidesPerView = 1;
const spaceBetween = 24;
const breakpoints = {
    540: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 3,
    },
    1024: {
        slidesPerView: 4,
    }
};

const slides = computed(() => elementData.getData('products') ?? []);
</script>

<template>
    <ClientOnly>
        <div
            v-if="slides?.length"
            :class="border ? 'border border-gray px-4 py-2' : null"
        >
            <h3
                v-if="title"
                class="font-bold"
            >
                {{ title }}
            </h3>

            <LayoutSlider
                :class="{
                    'cursor-grab': slides.length > 1,
                }"
                class="w-full"
                :auto-slide="autoSlide"
                :navigation-arrows="navigation"
                :navigation-dots="false"
                :slides-per-view="slidesPerView"
                :space-between="spaceBetween"
                :breakpoints="breakpoints"
            >
                <LayoutSliderSlide
                    v-for="slide in slides"
                    :key="slide.id"
                    :class="`min-w-[${minWidth}] py-2`"
                >
                    <ProductCard
                        :product="slide"
                        :layout="boxLayout"
                        :display-mode="displayMode"
                    />
                </LayoutSliderSlide>
            </LayoutSlider>
        </div>
    </ClientOnly>
</template>
