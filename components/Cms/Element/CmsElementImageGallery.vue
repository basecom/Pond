<script setup lang="ts">
import type { CmsElementImageGallerySlider } from '~/types/cms/element/CmsElementImageGallery';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    element: CmsElementImageGallery;
}>();

const elementConfig = useCmsElementConfig(props.element);
const { getCmsElementData } = useCmsUtils();
const slides = getCmsElementData(props.element, 'sliderItems')?? [];

const navigationDots = elementConfig.getConfigValue('navigationDots');
const navigationArrows = elementConfig.getConfigValue('navigationArrows');
const displayMode = elementConfig.getConfigValue('displayMode');
const minHeight = elementConfig.getConfigValue('minHeight');
const galleryPosition = elementConfig.getConfigValue('galleryPosition');
const isLightboxEnabled = elementConfig.getConfigValue('fullScreen');
const isZoomEnabled = elementConfig.getConfigValue('zoom');

const thumbnailSlidesPerView = 3;
const spaceBetween = 16;

const lightboxModalController = useModal();
const lightboxSliderIndex = ref(0);

const openLightbox = (slideMediaId: string) => {
    if (!isLightboxEnabled) {
        return;
    }
    // When the lightbox is opened, the clicked image should be displayed
    lightboxSliderIndex.value = slides.findIndex(
        (slide: CmsElementImageGallerySlider) => slide.media.id === slideMediaId,
    );
    lightboxModalController.open();
};
</script>

<template>
    <ClientOnly>
        <div
            class="flex max-h-[640px] gap-4"
            :class="galleryPosition.value === 'underneath' ? 'max-h-full flex-col flex-wrap' : 'flex-row-reverse'"
        >
            <template v-if="slides.length > 0">
                <LayoutSlider
                    :classes="[
                        slides.length > 1 ? 'cursor-grab' : '',
                        galleryPosition.value === 'underneath' ? 'w-full' : 'w-auto',
                        'max-w-[calc(100%-clamp(100px,100%,150px)-16px)]',
                    ]"
                    :navigation-dots="navigationDots !== 'None' && navigationDots !== 'Keine'"
                    :navigation-arrows="navigationArrows !== 'None' && navigationArrows !== 'Keine'"
                    :thumbs-swiper="`.thumbnailRef-${element.id}`"
                >
                    <LayoutSliderSlide
                        v-for="slide in slides"
                        :key="slide.media.id"
                        :class="`min-h-[${minHeight}]`"
                        @click="openLightbox(slide.media.id)"
                    >
                        <img
                            v-if="slide.media.url"
                            :src="slide.media.url"
                            :alt="getTranslatedProperty(slide.media, 'alt') || $t('cms.element.imageAlt')"
                            :title="getTranslatedProperty(slide.media, 'title') || $t('cms.element.imageAlt')"
                            class="size-full object-center"
                            :class="'object-' + displayMode"
                        >

                        <template v-else>
                            <div class="w-full bg-gray-light">
                                <SharedImagePlaceholder :size="'lg'" />
                            </div>
                        </template>
                    </LayoutSliderSlide>
                </LayoutSlider>

                <LayoutSlider
                    :classes="[
                        galleryPosition.value === 'underneath' ? 'w-full' : '',
                        slides.length > 1 ? 'cursor-grab' : '',
                        'max-w-[clamp(100px,100%,150px)]',
                    ]"
                    :navigation-dots="false"
                    :navigation-arrows="slides.length > thumbnailSlidesPerView"
                    :vertical-navigation="true"
                    :direction="galleryPosition === 'left' ? 'vertical' : 'horizontal'"
                    :space-between="spaceBetween"
                    :slides-per-view="thumbnailSlidesPerView"
                    :thumb-ref="`thumbnailRef-${element.id}`"
                >
                    <LayoutSliderSlide
                        v-for="slide in slides"
                        :key="slide.media.id"
                        class="group"
                    >
                        <img
                            v-if="slide.media.url"
                            :src="slide.media.url"
                            :alt="getTranslatedProperty(slide.media, 'alt') || $t('cms.element.imageAlt')"
                            :title="getTranslatedProperty(slide.media, 'title') || $t('cms.element.imageAlt')"
                            class="object-cover object-center opacity-40 group-[.swiper-slide-thumb-active]:border-2 group-[.swiper-slide-thumb-active]:border-brand-primary group-[.swiper-slide-thumb-active]:opacity-100"
                        >

                        <template v-else>
                            <div
                                class="w-full bg-gray-light opacity-40 group-[.swiper-slide-thumb-active]:border-2 group-[.swiper-slide-thumb-active]:border-brand-primary group-[.swiper-slide-thumb-active]:opacity-100"
                            >
                                <SharedImagePlaceholder :size="'sm'" />
                            </div>
                        </template>
                    </LayoutSliderSlide>
                </LayoutSlider>
            </template>

            <template v-else>
                <div class="w-full bg-gray-light">
                    <SharedImagePlaceholder :size="'lg'" />
                </div>
            </template>
        </div>

        <SharedGalleryLightBox
            :controller="lightboxModalController"
            :image-classes="'object-' + displayMode"
            :slides="slides"
            :is-zoom-enabled="isZoomEnabled"
            :slider-index="lightboxSliderIndex"
            :thumbs-swiper="`.thumbnailRef-${element.id}`"
        />
    </ClientOnly>
</template>
