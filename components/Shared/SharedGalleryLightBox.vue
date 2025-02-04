<script setup lang="ts">
import type { CmsElementImageGallerySlider } from '../../types/cms/element/cmsElementImageGallery';

defineProps<{
    controller: ReturnType<typeof useModal>;
    imageClasses: string;
    slides: CmsElementImageGallerySlider[];
    isZoomEnabled: boolean;
    sliderIndex: number;
    thumbsSwiper: string;
}>();
</script>
<template>
    <LazySharedModal
        :controller="controller"
        :show-header="false"
        :with-close-button="true"
        size="lg"
    >
        <template #content>
            <LayoutSlider
                classes="w-auto"
                :navigation-dots="false"
                :navigation-arrows="true"
                :thumbs-swiper="thumbsSwiper"
                :initial-slide="sliderIndex"
                :show-arrows="slides.length > 1"
                :is-zoom-enabled="isZoomEnabled"
            >
                <LayoutSliderSlide
                    v-for="slide in slides"
                    :key="slide.media.id"
                >
                    <div class="swiper-zoom-container pt-2">
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
