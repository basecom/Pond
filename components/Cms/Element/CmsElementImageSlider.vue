<script setup lang="ts">

const props = defineProps<{
    element: CmsElementImageSlider;
}>();
// Main slider html object
const sliderRef = ref(null);

const config = useCmsElementConfig(props.element);
const sliderItems = computed(() => props.element.data?.sliderItems ?? []);
const slides = ref(Array.from({ length: sliderItems.value.length }));

if (sliderItems.value.length > 0) {
    // Main slider swiper instance
    useSwiper(sliderRef, {

    });
}
const autoplayConfig = computed(( )=>{
    if (config.value?.autoSlide.value) {
        return {
            delay: config.value?.autoplayTimeout.value,
            disableOnInteraction: false,
        };
    }

    return false;
});

const speedConfig = computed(( )=> {
    return config.value?.autoSlide.value ? config.value?.speed.value: '300';
});
const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
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
                    :pagination="config.navigationDots.value !== 'None'"
                    :navigation=" config.navigationArrows.value !== 'None'"
                    :loop="true"
                >
                    <swiper-slide
                        v-for="(slide, idx) in slides"
                        :key="element.id + '-' + idx"
                        :class="'min-h-['+config.minHeight.value+']'"
                    >
                        <img
                            :src="sliderItems[idx].media.url"
                            :alt="sliderItems[idx].media.translated.alt"
                            class="h-full w-full object-center"
                            :class="'object-'+config.displayMode.value"
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
    <LayoutSlider>
        Test
        <LayoutSliderSlide v-for="element in items">
            {{element}}
        </LayoutSliderSlide>
    </LayoutSlider>
</template>
