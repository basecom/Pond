<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';
import type { PromotionInfo } from '~/types/analytics/Promotion';
import type { CmsImageSliderItem } from '~/types/cms/CmsImageSliderItem';

const props = defineProps<{
    element: CmsElementImageSlider;
}>();

const config = useCmsElementConfig(props.element);
const { getCmsElementData, shouldPreloadElement } = useCmsUtils();
const slides = getCmsElementData(props.element, 'sliderItems') ?? [];

const { trackPromotionView } = useAnalytics();
const { isHomePage } = useHomePage();
const navigationDots = config.getConfigValue('navigationDots');
const navigationArrows = config.getConfigValue('navigationArrows');
const displayMode = config.getConfigValue('displayMode');
const autoSlide = config.getConfigValue('autoSlide');
const autoplayTimeout = config.getConfigValue('autoplayTimeout');
const minHeight = config.getConfigValue('minHeight');
const speed = config.getConfigValue('speed');
const shouldPreloadImage = shouldPreloadElement(props.element);

const sliderRef = ref(null);

if (slides.value?.length) {
    useSwiper(sliderRef, {});
}

const autoplayConfig = computed(() =>
    autoSlide
        ? {
            delay: autoplayTimeout,
            disableOnInteraction: false,
        }
        : false,
);

const speedConfig = computed(() => (autoSlide ? speed : '300'));
const slidesRef = ref([]);
const trackedSlides: Ref<string[]> = ref([]);

const getPromotion = (media: Schemas['Media']): PromotionInfo => ({
    creative_name: media.fileName ?? '',
    creative_slot: props.element?.type ?? '',
    promotion_id: props.element?.blockId ?? '',
    promotion_name: props.element?.type ?? '',
});

if (isHomePage.value) {
    const { stop } = useIntersectionObserver(slidesRef, events => {
        events.forEach(event => {
            if (event.isIntersecting) {
                const mediaUrl = (event.target as HTMLImageElement).src;
                const media: Schemas['Media'] = slides?.find((slide: CmsImageSliderItem) => slide.media?.url === mediaUrl)?.media;

                if (media?.fileName && !trackedSlides.value.includes(media.fileName)) {
                    trackPromotionView(getPromotion(media));
                    trackedSlides.value = [...trackedSlides.value, media.fileName];
                }

                if (trackedSlides.value.length === slidesRef.value.length) {
                    stop();
                }
            }
        });
    });
}
const firstSlide = slides?.at(0);

if (firstSlide && shouldPreloadImage) {
    useImagePreload({
        src: firstSlide.media.url,
        alt: getTranslatedProperty(firstSlide.media, 'alt'),
    });
}
</script>

<template>
    <ClientOnly>
        <div
            v-if="slides?.length"
            :style="{ minHeight: minHeight }"
        >
            <LayoutSlider
                ref="sliderRef"
                :slides-counter="slides.length"
                class="w-full"
                :style="{ minHeight: minHeight }"
                :autoplay="autoplayConfig"
                :speed="speedConfig"
                :pagination="navigationDots !== 'None'"
                :navigation="navigationArrows !== 'None'"
                :loop="true"
            >
                <LayoutSliderSlide
                    v-for="slide in slides"
                    :key="slide.media.id"
                    :class="`min-h-[${minHeight}]`"
                >
                    <img
                        ref="slidesRef"
                        :src="slide.media.url"
                        :alt="getTranslatedProperty(slide.media, 'alt') || $t('cms.element.imageAlt')"
                        :title="getTranslatedProperty(slide.media, 'title') || $t('cms.element.imageAlt')"
                        class="size-full object-center"
                        :class="'object-' + displayMode"
                    >
                </LayoutSliderSlide>
            </LayoutSlider>
        </div>

        <template v-else>
            <div class="w-full bg-gray-light">
                <SharedImagePlaceholder :size="'lg'" />
            </div>
        </template>

        <template #fallback>
            <div v-if="slides.length > 0">
                <img
                    :src="slides?.at(0)?.media.url"
                    :loading="shouldPreloadImage ? 'eager' : 'lazy'"
                    :alt="getTranslatedProperty(slides?.at(0)?.media, 'alt') || $t('cms.element.imageAlt')"
                    :title="getTranslatedProperty(slides?.at(0)?.media, 'title') || $t('cms.element.imageAlt')"
                    class="size-full object-center"
                    :class="'object-' + displayMode"
                >
            </div>
        </template>
    </ClientOnly>
</template>
