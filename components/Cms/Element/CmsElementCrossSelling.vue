<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementCrossSelling;
}>();

const config = useCmsElementConfig(props.element);
const elementData = useCmsElementData(props.element);
const { trackSelectItem } = useAnalytics();

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
const breakPointsConfig = {
    'sm': 540,
    'md': 768,
    'lg': 1024,
};
const breakPoints = useBreakpoints(breakPointsConfig);
const isSm = breakPoints.greater('sm');
const isMd = breakPoints.greater('md');
const isLg = breakPoints.greater('lg');
const currentSlidesPerView = computed(() => {
    if (isLg.value) {
        return breakpoints[1024].slidesPerView;
    }

    if (isMd.value) {
        return breakpoints[768].slidesPerView;
    }

    if (isSm.value) {
        return breakpoints[540].slidesPerView;
    }

    return slidesPerView;
});
const showNavigationArrows = computed(() => crossSellings.value >= currentSlidesPerView.value);
const onSelectProduct = async (product: Schemas['Product']) => {
    trackSelectItem(product, { id: 'cross-selling', name: 'cross-selling' });
};
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
                :classes="[crossSelling.products.length > 1 ? 'cursor-grab' : '']"
                :navigation-dots="false"
                :slides-per-view="slidesPerView"
                :space-between="spaceBetween"
                :breakpoints="breakpoints"
                :navigation-arrows="showNavigationArrows"
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
                        @select-product="onSelectProduct(slide)"
                    />
                </LayoutSliderSlide>
            </LayoutSlider>
        </template>
    </ClientOnly>
</template>
