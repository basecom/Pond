<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { PromotionInfo } from '../../../types/analytics/promotion';

const props = defineProps<{
    element: CmsElementProductSlider;
}>();

const config = useCmsElementConfig(props.element);
const elementData = useCmsElementData(props.element);
const { trackPromotionView, trackSelectPromotion, trackSelectItem } = useAnalytics();
const { isHomePage } = useHomePage();
const border = config.getConfigValue('border');
const boxLayout = config.getConfigValue('boxLayout');
const displayMode = config.getConfigValue('displayMode');
const minWidth = config.getConfigValue('elMinWidth');
const navigation = config.getConfigValue('navigation');
const title = config.getConfigValue('title');
const autoSlide = config.getConfigValue('rotate');

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

const slides = computed(() => elementData.getData('products') ?? []);
const { showNavigationArrows, shouldAutoSlide } = useComputeSliderConfig({
    slidesPerView,
    slides,
    breakpoints,
    showNavigation: navigation,
    autoSlide,
});

const getPromotion = (product: Schemas['Product']): PromotionInfo => ({
    creative_name: product.cover?.media.fileName ?? '',
    creative_slot: props.element?.type ?? '',
    promotion_id: props.element?.blockId ?? '',
    promotion_name: props.element?.type ?? '',
});

const onProductView = (product: Schemas['Product'], index: string | number) => {
    if (isHomePage.value) {
        trackPromotionView(getPromotion(product), product, Number(index));
    } else {
        trackSelectItem(product, { id: props.element?.blockId ?? '', name: props.element?.type ?? '' });
    }
};
const onProductSelect = (product: Schemas['Product'], index: string | number) => {
    if (isHomePage.value) {
        trackSelectPromotion(getPromotion(product), product, Number(index));
    }
};
</script>

<template>
    <ClientOnly>
        <div
            v-if="slides?.length"
            :class="border ? 'border border-gray px-4 py-2' : null"
        >
            <h3
                v-if="title"
                class="font-bold"
            >
                {{ title }}
            </h3>

            <LayoutSlider
                :class="{
                    'cursor-grab': slides.length > 1,
                }"
                class="w-full"
                :auto-slide="shouldAutoSlide"
                :navigation-arrows="showNavigationArrows"
                :navigation-dots="false"
                :slides-per-view="slidesPerView"
                :space-between="spaceBetween"
                :breakpoints="breakpoints"
            >
                <LayoutSliderSlide
                    v-for="(slide, index) in slides"
                    :key="slide.id"
                    :class="`min-w-[${minWidth}] py-2`"
                >
                    <ProductCard
                        :product="slide"
                        :layout="boxLayout"
                        :display-mode="displayMode"
                        @view-product="onProductView(slide, index)"
                        @select-product="onProductSelect(slide, index)"
                    />
                </LayoutSliderSlide>
            </LayoutSlider>
        </div>
    </ClientOnly>
</template>
