<script setup lang="ts">
import type { CmsElementImageGallery } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementImageGallery;
}>();

const elementConfig = useCmsElementConfig(props.element);
const navigationDots = elementConfig.getConfigValue('navigationDots');
const navigationArrows = elementConfig.getConfigValue('navigationArrows');
const displayMode = elementConfig.getConfigValue('displayMode');
const minHeight = elementConfig.getConfigValue('minHeight');
const galleryPosition = elementConfig.getConfigValue('galleryPosition');

const elementData = useCmsElementData(props.element);
const slides = elementData.getData('sliderItems') ?? [];

const thumbnailSlidesPerView = 3;
</script>

<template>
    <ClientOnly>
        <div
            class="flex max-h-[640px] gap-4"
            :class="
                galleryPosition.value === 'underneath'
                    ? 'max-h-full flex-col flex-wrap'
                    : 'flex-row-reverse'
            "
        >
            <template v-if="slides.length > 0">
                <LayoutSlider
                    :classes="[
                        slides.length > 1 ? 'cursor-grab' : '',
                        galleryPosition.value === 'underneath' ? 'w-full' : 'w-4/5'
                    ]"
                    :navigationDots="navigationDots !== 'None'"
                    :navigationArrows="navigationArrows !== 'None'"
                    :thumbs-swiper="`.thumbnailRef-${element.id}`"
                >
                    <LayoutSliderSlide
                        v-for="slide in slides"
                        :key="slide.media.id"
                        :class="`min-h-[${minHeight}]`"
                    >
                        <img
                            :src="slide.media.url"
                            :alt="slide.translated?.alt ?? $t('cms.element.imageAlt')"
                            class="h-full w-full object-center"
                            :class="'object-' + displayMode"
                        />
                    </LayoutSliderSlide>
                </LayoutSlider>

                <LayoutSlider
                    :classes="[
                        'thumbnailRef-' + element.id,
                        galleryPosition.value === 'underneath' ? 'w-full' : 'w-1/5',
                        slides.length > 1 ? 'cursor-grab' : '',
                    ]"
                    :navigationDots="false"
                    :navigationArrows="false"
                    :direction="galleryPosition === 'left' ? 'vertical' : 'horizontal'"
                    :spaceBetween="16"
                    :slidesPerView="thumbnailSlidesPerView"
                >
                    <LayoutSliderSlide
                        v-for="slide in slides"
                        :key="slide.media.id"
                        class="group"
                        :class="`min-h-[${minHeight}]`"
                    >
                        <img
                            :src="slide.media.url"
                            :alt="slide.translated?.alt ?? $t('cms.element.imageAlt')"
                            class="h-full w-full object-cover object-center opacity-40 group-[.swiper-slide-thumb-active]:border-2 group-[.swiper-slide-thumb-active]:border-brand-primary group-[.swiper-slide-thumb-active]:opacity-100"
                        />
                    </LayoutSliderSlide>
                </LayoutSlider>
            </template>

            <template v-else>
                <div class="w-full bg-gray-light">
                    <SharedImagePlaceholder :size="'lg'" />
                </div>
            </template>
        </div>
    </ClientOnly>
</template>
