<script setup lang="ts">
import type { CmsElementImageGallerySlider } from '~/types/cms/CmsElementImageGallery';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    element: CmsElementImageGallery;
}>();

const elementConfig = useCmsElementConfig(props.element);
const { getCmsElementData } = useCmsUtils();
const slides = getCmsElementData(props.element, 'sliderItems') ?? [];
const firstSlide = slides.at(0);

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
const staticThumbnails = computed(() => slides.slice(0, thumbnailSlidesPerView));

if (firstSlide) {
    useImagePreload({
        src: firstSlide.media.url,
        alt: getTranslatedProperty(firstSlide.media, 'alt'),
    });
}

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
    <div
        class="flex max-h-[640px] gap-4"
        :class="galleryPosition.value === 'underneath' ? 'max-h-full flex-col flex-wrap' : 'flex-row-reverse'"
    >
        <template v-if="slides.length > 0">
            <ClientOnly>
                <LayoutSlider
                    :classes="{
                        'w-full': galleryPosition.value === 'underneath',
                        'w-auto': galleryPosition.value !== 'underneath',
                        'max-w-[calc(100%-clamp(100px,100%,150px)-16px)]': true,
                    }"
                    :slides-counter="slides.length"
                    :navigation-dots="navigationDots !== 'None' && navigationDots !== 'Keine'"
                    :navigation-arrows="navigationArrows !== 'None' && navigationArrows !== 'Keine'"
                    :thumbs-swiper="`.thumbnailRef-${element.id}`"
                >
                    <LayoutSliderSlide
                        v-for="(slide, index) in slides"
                        :key="slide.media.id"
                        :class="`min-h-[${minHeight}]`"
                        @click="openLightbox(slide.media.id)"
                    >
                        <img
                            v-if="slide.media.url"
                            :src="slide.media.url"
                            :alt="getTranslatedProperty(slide.media, 'alt') || $t('cms.element.imageAlt')"
                            :title="getTranslatedProperty(slide.media, 'title') || $t('cms.element.imageAlt')"
                            :loading="index === 0 ? 'eager' : 'lazy'"
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
                    :classes="{
                        'w-full': galleryPosition.value === 'underneath',
                        'max-w-[clamp(100px,100%,150px)]': true
                    }"
                    :navigation-dots="false"
                    :navigation-arrows="slides.length > thumbnailSlidesPerView"
                    :vertical-navigation="true"
                    :direction="galleryPosition === 'left' ? 'vertical' : 'horizontal'"
                    :space-between="spaceBetween"
                    :slides-per-view="thumbnailSlidesPerView"
                    :thumb-ref="`thumbnailRef-${element.id}`"
                >
                    <LayoutSliderSlide
                        v-for="(slide, index) in slides"
                        :key="slide.media.id"
                        class="group"
                    >
                        <img
                            v-if="slide.media.url"
                            :src="slide.media.url"
                            :alt="getTranslatedProperty(slide.media, 'alt') || $t('cms.element.imageAlt')"
                            :title="getTranslatedProperty(slide.media, 'title') || $t('cms.element.imageAlt')"
                            :loading="index < thumbnailSlidesPerView ? 'eager' : 'lazy'"
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

                <template #fallback>
                    <div
                        class="grid size-full min-h-[430px] max-w-[calc(100%-clamp(100px,100%,150px)-16px)]"
                        :class="[
                            slides.length > 1 ? 'cursor-grab' : '',
                            galleryPosition === 'underneath' ? 'w-full' : 'w-auto',
                        ]"
                    >
                        <img
                            v-if="firstSlide?.media.url"
                            :src="firstSlide?.media.url"
                            :alt="getTranslatedProperty(firstSlide?.media, 'alt') || $t('cms.element.imageAlt')"
                            :title="getTranslatedProperty(firstSlide?.media, 'title') || $t('cms.element.imageAlt')"
                            class="size-full object-center"
                            :class="'object-' + displayMode"
                            loading="eager"
                        >

                        <template v-else>
                            <div class="w-full bg-gray-light">
                                <SharedImagePlaceholder :size="'lg'" />
                            </div>
                        </template>
                    </div>

                    <div
                        :class="{
                            'w-full': galleryPosition.value === 'underneath',
                            'max-w-[clamp(100px,100%,150px)]': true
                        }"
                    >
                        <div
                            v-for="(slide, index) in staticThumbnails"
                            :key="slide.media.id"
                            class="group mb-4 flex h-[122.2px] last:mb-0"
                            :class="index === 0 ? 'swiper-slide-thumb-active' : ''"
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
                        </div>
                    </div>
                </template>
            </ClientOnly>
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
</template>
