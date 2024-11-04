<script setup lang="ts">
const props = defineProps<{
    element: CmsElementImageGallery;
}>();

const elementConfig = useCmsElementConfig(props.element);
const elementData = useCmsElementData(props.element);

const navigationDots = elementConfig.getConfigValue('navigationDots');
const navigationArrows = elementConfig.getConfigValue('navigationArrows');
const displayMode = elementConfig.getConfigValue('displayMode');
const minHeight = elementConfig.getConfigValue('minHeight');
const galleryPosition = elementConfig.getConfigValue('galleryPosition');

const thumbnailSlidesPerView = 3;
const spaceBetween = 16;

const slides = elementData.getData('sliderItems') ?? [];
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
                        'max-w-full md:max-w-[calc(100%-150px-16px)]',
                    ]"
                    :navigation-dots="navigationDots !== 'None' && navigationDots !== 'Keine'"
                    :navigation-arrows="navigationArrows !== 'None' && navigationArrows !== 'Keine'"
                    :thumbs-swiper="`.thumbnailRef-${element.id}`"
                >
                    <LayoutSliderSlide
                        v-for="slide in slides"
                        :key="slide.media.id"
                        :class="`min-h-[${minHeight}]`"
                    >
                        <img
                            v-if="slide.media.url"
                            :src="slide.media.url"
                            :alt="slide.translated?.alt ?? $t('cms.element.imageAlt')"
                            class="h-full w-full object-center"
                            :class="'object-' + displayMode"
                        />

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
                            :alt="slide.translated?.alt ?? $t('cms.element.imageAlt')"
                            class="object-cover object-center opacity-40 group-[.swiper-slide-thumb-active]:border-2 group-[.swiper-slide-thumb-active]:border-brand-primary group-[.swiper-slide-thumb-active]:opacity-100"
                        />

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
    </ClientOnly>
</template>
