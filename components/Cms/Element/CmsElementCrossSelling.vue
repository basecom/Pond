<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

type NavigationArrowItem = {
    id: string;
    showNavigationArrows: ComputedRef<boolean>;
};

const props = defineProps<{
    element: CmsElementCrossSelling;
}>();

const config = useCmsElementConfig(props.element);
const { getCmsElementData } = useCmsUtils();
const crossSellings = getCmsElementData(props.element, 'crossSellings') ?? [];
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

const navigationArrowsMap = crossSellings.map((crossSelling: Schemas['CrossSellingElement']) => {
    const crossSellingProducts = computed(() => crossSelling.products);

    const { showNavigationArrows } = useComputeSliderConfig({
        slidesPerView,
        slides: crossSellingProducts,
        breakpoints,
        showNavigation: true,
        autoSlide: false,
    });

    return {
        id: crossSelling.crossSelling.id,
        showNavigationArrows,
    };
});

const showNavigationArrowForCrossSelling = (crossSellingId: string) => {
    const item = navigationArrowsMap.find((item: NavigationArrowItem) => item.id === crossSellingId);
    return item ? item.showNavigationArrows.value : false;
};

const onSelectProduct = async (product: Schemas['Product']) => {
    trackSelectItem(product, { id: 'cross-selling', name: 'cross-selling' });
};

const { shouldPreloadElement } = useCmsElementPreload();
const shouldPreloadImage = shouldPreloadElement(props.element);
</script>

<template>
    <ClientOnly>
        <template
            v-for="(crossSelling, index) in crossSellings"
            :key="crossSelling.crossSelling.id"
        >
            <h3 class="mt-8 font-bold">
                {{ crossSelling.crossSelling.translated.name }}
            </h3>

            <LayoutSlider
                :slides-counter="crossSelling.products.length"
                :navigation-arrows="showNavigationArrowForCrossSelling(crossSelling.crossSelling.id)"
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
                        :should-preload-image="shouldPreloadImage && index === 0"
                        @select-product="onSelectProduct(slide)"
                    />
                </LayoutSliderSlide>
            </LayoutSlider>
        </template>
    </ClientOnly>
</template>
