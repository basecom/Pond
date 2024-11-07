<script setup lang="ts">
const props = defineProps<{
    element: CmsElementCrossSelling;
}>();

const config = useCmsElementConfig(props.element);
const elementData = useCmsElementData(props.element);

const boxLayout = config.getConfigValue('boxLayout');
const displayMode = config.getConfigValue('displayMode');
const minWidth = config.getConfigValue('elMinWidth');

const slidesPerView = 1;
const spaceBetween = 24;
const breakpoints = {
    540: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 3,
    },
    1024: {
        slidesPerView: 4,
    },
};

const crossSellings = computed(() => elementData.getData('crossSellings') ?? []);
</script>

<template>
    <ClientOnly>
        <template
            v-for="crossSelling in crossSellings"
            :key="crossSelling.crossSelling.id"
        >
            <h3 class="mt-8 font-bold">
                {{ crossSelling.crossSelling.translated.name }}
            </h3>

            <LayoutSlider
                :classes="[crossSelling.products.length > 1 ?? 'cursor-grab']"
                :navigation-dots="false"
                :slides-per-view="slidesPerView"
                :space-between="spaceBetween"
                :breakpoints="breakpoints"
            >
                <LayoutSliderSlide
                    v-for="slide in crossSelling.products"
                    :key="slide.id"
                    :class="`min-w-[${minWidth}] py-2`"
                >
                    <ProductCard
                        :product="slide"
                        :layout="boxLayout"
                        :display-mode="displayMode"
                    />
                </LayoutSliderSlide>
            </LayoutSlider>
        </template>
    </ClientOnly>
</template>
