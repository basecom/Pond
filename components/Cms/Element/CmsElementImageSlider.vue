<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementImageSlider;
}>();

const config = useCmsElementConfig(props.element);
const data = useCmsElementData(props.element);
const { trackPromotionView, trackSelectPromotion } = useAnalytics();
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

// if (isHomePage.value) {
    const { stop } = useIntersectionObserver(
        slidesRef,
        (events) => {
            events.forEach((event) => {
                if (event.isIntersecting) {
                    const mediaUrl = (event.target as HTMLImageElement).src;
                    const slidesData = data.getData('sliderItems');
                    const media: Schemas["Media"] = slidesData?.find((slide) => slide.media?.url === mediaUrl)?.media;

                    if (media && !trackedSlides.value.includes(media.fileName)) {
                        trackPromotionView(media.fileName);
                        trackedSlides.value = [ ...trackedSlides.value, media.fileName ];
                    }
                }
            });
        },
    );
// }
</script>

<template>
    <ClientOnly>
        <template v-if="slides?.length">
            <LayoutSlider
                ref="sliderRef"
                :class="{
                    'cursor-grab': slides.length > 1,
                }"
                class="w-full"
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
        </template>

        <template v-else>
            <div class="w-full bg-gray-light">
                <SharedImagePlaceholder :size="'lg'" />
            </div>
        </template>
    </ClientOnly>
</template>
