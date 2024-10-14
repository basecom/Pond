<script setup lang="ts">
const props = defineProps<{
    element: CmsElementCrossSelling;
}>();

const config = useCmsElementConfig(props.element);
const elementData = useCmsElementData(props.element);

const boxLayout = config.getConfigValue('boxLayout');
const displayMode = config.getConfigValue('displayMode');
const minWidth = config.getConfigValue('elMinWidth');

const slidesPerView = 4;
const spaceBetween = 24;

const crossSellings = computed(() => elementData.getData('crossSellings') ?? []);
</script>

<template>
    <ClientOnly>
        <template v-for="crossSelling in crossSellings">
            <h3 class="font-bold mt-8">
                {{ crossSelling.crossSelling.translated.name }}
            </h3>

            <LayoutSlider
                :class="{
                'cursor-grab': crossSelling.products.length > 1,
            }"
                class="w-full"
                :navigation-dots="false"
                :slides-per-view="slidesPerView"
                :space-between="spaceBetween"
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
