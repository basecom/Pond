<script setup lang="ts">
const props = defineProps<{
    element: CmsElementImageSlider;
}>();

const config = useCmsElementConfig(props.element);
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
