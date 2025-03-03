<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { PromotionInfo } from '~/types/analytics/Promotion';

const props = defineProps<{
    element: CmsElementProductSlider;
}>();

const config = useCmsElementConfig(props.element);
const { getCmsElementData } = useCmsUtils();
const products = getCmsElementData(props.element, 'products') ?? [];
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
const breakpointsClasses: Record<number, string> = {
    0: '',
    1: 'hidden sm:block',
    2: 'hidden md:block',
    3: 'hidden lg:block',
};

const slides = computed(() => products);
const { showNavigationArrows, shouldAutoSlide } = useComputeSliderConfig({
    slidesPerView,
    slides,
    breakpoints,
    showNavigation: navigation,
    autoSlide,
});

const isSliderLoaded = ref(false);
const placeholderClasses = computed(() => isSliderLoaded.value ? 'hidden' : '');

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

        <ClientOnly>
            <LayoutSlider
                :slides-counter="slides.length"
                class="w-full"
                :auto-slide="shouldAutoSlide"
                :navigation-arrows="showNavigationArrows"
                :navigation-dots="false"
                :slides-per-view="slidesPerView"
                :space-between="spaceBetween"
                :breakpoints="breakpoints"
                @slides-change="isSliderLoaded = true"
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
        </ClientOnly>
        <div class="flex overflow-hidden" :class="placeholderClasses">
            <template v-for="(slide, index) in slides" :key="slide.id">
                <div class="pr-6" :class="breakpointsClasses[index] ?? 'hidden'">
                    <ProductCard
                        :product="slide"
                        :layout="boxLayout"
                        :display-mode="displayMode"
                    />
                </div>
            </template>
        </div>
    </div>
</template>
