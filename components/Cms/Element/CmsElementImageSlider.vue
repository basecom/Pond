<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { PromotionInfo } from '../../../types/analytics/promotion';

const props = defineProps<{
    element: CmsElementImageSlider;
}>();

const config = useCmsElementConfig(props.element);
const data = useCmsElementData(props.element);
const { trackPromotionView } = useAnalytics();
const { isHomePage } = useHomePage();
const navigationDots = config.getConfigValue('navigationDots');
const navigationArrows = config.getConfigValue('navigationArrows');
const displayMode = config.getConfigValue('displayMode');
const autoSlide = config.getConfigValue('autoSlide');
const autoplayTimeout = config.getConfigValue('autoplayTimeout');
const minHeight = config.getConfigValue('minHeight');
const speed = config.getConfigValue('speed');

const slides = computed(() => config.getConfigValue('sliderItems') ?? []);
const sliderRef = ref(null);

if (slides.value.length > 0) {
    useSwiper(sliderRef, {});
}

const autoplayConfig = computed(() => {
    return autoSlide
        ? {
              delay: autoplayTimeout,
              disableOnInteraction: false,
          }
        : false;
});

const speedConfig = computed(() => {
    return autoSlide ? speed : '300';
});
const slidesRef = ref([]);
const trackedSlides = ref([]);

const getPromotion = (media: Schemas["Media"]): PromotionInfo => {
    return {
        creative_name: media.fileName ?? '',
        creative_slot: props.element?.type ?? '',
        promotion_id: props.element?.blockId ?? '',
        promotion_name: props.element?.type ?? '',
    }
};

if (isHomePage.value) {
    const { stop } = useIntersectionObserver(
        slidesRef,
        (events) => {
            events.forEach((event) => {
                if (event.isIntersecting) {
                    const mediaUrl = (event.target as HTMLImageElement).src;
                    const slidesData = data.getData('sliderItems');
                    const media: Schemas["Media"] = slidesData?.find((slide) => slide.media?.url === mediaUrl)?.media;

                    if (media && !trackedSlides.value.includes(media.fileName)) {
                        trackPromotionView(getPromotion(media));
                        trackedSlides.value = [ ...trackedSlides.value, media.fileName ];
                    }

                    if (trackedSlides.value.length === slidesRef.value.length) {
                        stop();
                    }
                }
            });
        },
    );
}
</script>

<template>
    <ClientOnly>
        <div v-if="slides?.length">
            <LayoutSlider
                ref="sliderRef"
                :class="{
                    'cursor-grab': slides.length > 1,
                }"
                class="w-full"
                :style="{ 'minHeight': minHeight }"
                :autoplay="autoplayConfig"
                :speed="speedConfig"
                :pagination="navigationDots !== 'None'"
                :navigation="navigationArrows !== 'None'"
                :loop="true"
            >
                <LayoutSliderSlide
                    v-for="slide in slides"
                    :key="slide.mediaId"
                    :class="`min-h-[${minHeight}]`"
                >
                    <img
                        ref="slidesRef"
                        :src="slide.mediaUrl"
                        :alt="$t('cms.element.imageAlt')"
                        class="h-full w-full object-center"
                        :class="'object-' + displayMode"
                    />
                </LayoutSliderSlide>
            </LayoutSlider>
        </div>

        <template v-else>
            <div class="w-full bg-gray-light">
                <SharedImagePlaceholder :size="'lg'" />
            </div>
        </template>
    </ClientOnly>
</template>
