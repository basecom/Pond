<script setup lang="ts">
import type { CmsElementImageGallerySlider } from '../../types/cms/element/cmsElementImageGallery';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

withDefaults(
    defineProps<{
        controller: ReturnType<typeof useModal>;
        slides: CmsElementImageGallerySlider[];
        imageClasses?: string;
        isZoomEnabled?: boolean;
        sliderIndex?: number;
        thumbsSwiper?: string;
    }>(),
    {
        imageClasses: '',
        isZoomEnabled: false,
        sliderIndex: 0,
        thumbsSwiper: '',
    },
);
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
                            :alt="getTranslatedProperty(slide.media, 'alt') || $t('cms.element.imageAlt')"
                            :title="getTranslatedProperty(slide.media, 'title') || $t('cms.element.imageAlt')"
                            class="h-full w-full object-center"
                            :class="imageClasses"
                        />
                    </div>
                </LayoutSliderSlide>
            </LayoutSlider>
        </template>
    </LazySharedModal>
</template>
