<script setup lang="ts">

const props = defineProps<{
    element: CmsElementImageSlider;
}>();
// Main slider html object
const sliderRef = ref(null);

const config = useCmsElementConfig(props.element);
const navigationDots = config.getConfigValue('navigationDots');
const content = config.getConfigValue('content');
const navigationArrows = config.getConfigValue('navigationArrows');
const displayMode = config.getConfigValue('displayMode');
const autoSlide = config.getConfigValue('autoSlide');
const autoplayTimeout = config.getConfigValue('autoplayTimeout');
const minHeight = config.getConfigValue('minHeight');
const speed = config.getConfigValue('speed');

const sliderItems = computed(() => props.element.data?.sliderItems ?? []);
const slides = ref(Array.from({ length: sliderItems.value.length }));

if (sliderItems.value.length > 0) {
    // Main slider swiper instance
    useSwiper(sliderRef, {

    });
}
const autoplayConfig = computed(( )=>{
    if (autoSlide) {
        return {
            delay: autoplayTimeout,
            disableOnInteraction: false,
        };
    }

    return false;
});

const speedConfig = computed(( )=> {
    return autoSlide ? speed: '300';
});
</script>

<template>
    <ClientOnly>
        <template v-if="sliderItems.length > 0">
            <swiper-container
                ref="sliderRef"
                :class="{
                        'cursor-grab': sliderItems.length > 1,
                    }"
                class="w-full"
                :thumbs-swiper="`.thumbnailRef-${element.id}`"
                :autoplay="autoplayConfig"
                :speed="speedConfig"
                :pagination="navigationDots !== 'None'"
                :navigation="navigationArrows !== 'None'"
                :loop="true"
            >
                <swiper-slide
                    v-for="(slide, idx) in slides"
                    :key="element.id + '-' + idx"
                    :class="'min-h-['+minHeight+']'"
                >
                    <img
                        :src="sliderItems[idx].media.url"
                        :alt="sliderItems[idx].media.translated.alt"
                        class="h-full w-full object-center"
                        :class="'object-'+displayMode"
                    />
                </swiper-slide>
            </swiper-container>
        </template>

        <template v-else>
            <div class="w-full bg-gray-light">
                <SharedImagePlaceholder :size="'lg'" />
            </div>
        </template>
    </ClientOnly>
</template>
