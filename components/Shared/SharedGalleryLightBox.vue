<script setup lang="ts">
defineProps<{
    controller: ReturnType<typeof useModal>;
    imageClasses: string;
    slides: [];
    isZoomEnabled: boolean;
    sliderIndex: number;
    thumbsSwiper: string;
}>();

/**
 * TODO: Replace custom zoom functionality with swiper zoom functions, whenever they are available/usabale in nuxt-swiper
 * https://swiperjs.com/swiper-api#zoom-methods
 */
const zoomScale = ref(1);
const zoomIn = () => {
    if (zoomScale.value < 2) {
        zoomScale.value = zoomScale.value + 0.25;
    }
};

const zoomOut = () => {
    if (zoomScale.value > 1) {
        zoomScale.value = zoomScale.value - 0.25;
    }
};
</script>
<template>
    <LazySharedModal
        :controller="controller"
        :show-header="false"
        :with-close-button="true"
    >
        <template #content>
            <!-- TODO: Replace with Formkit Icons -->
            <div v-if="isZoomEnabled">
                <button
                    :disabled="zoomScale === 2"
                    @click="zoomIn"
                >
                    Zoom in
                </button>
                <button
                    :disabled="zoomScale === 1"
                    @click="zoomScale = 1"
                >
                    Reset
                </button>
                <button
                    :disabled="zoomScale === 1"
                    @click="zoomOut"
                >
                    Zoom out
                </button>
            </div>
            <LayoutSlider
                classes="w-auto"
                :navigation-dots="false"
                :navigation-arrows="true"
                :thumbs-swiper="thumbsSwiper"
                :initial-slide="sliderIndex"
                :allow-touch-move="false"
            >
                <LayoutSliderSlide
                    v-for="slide in slides"
                    :key="slide.media.id"
                >
                    <div class="overflow-scroll">
                        <img
                            v-if="slide.media.url"
                            :src="slide.media.url"
                            :alt="slide.translated?.alt ?? $t('cms.element.imageAlt')"
                            class="h-full w-full object-center"
                            :class="imageClasses"
                            :style="{ transform: `scale(${zoomScale}, ${zoomScale})` }"
                        />
                    </div>
                </LayoutSliderSlide>
            </LayoutSlider>
        </template>
    </LazySharedModal>
</template>
