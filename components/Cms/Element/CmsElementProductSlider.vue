<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementProductSlider;
}>();

const config = useCmsElementConfig(props.element);
const elementData = useCmsElementData(props.element);
const { trackPromotionView, trackSelectPromotion } = useAnalytics();
const { routeName } = useNavigationContext();

const border = config.getConfigValue('border');
const boxLayout = config.getConfigValue('boxLayout');
const displayMode = config.getConfigValue('displayMode');
const minWidth = config.getConfigValue('elMinWidth');
const navigation = config.getConfigValue('navigation');
const title = config.getConfigValue('title');
const autoSlide = config.getConfigValue('rotate');

const slidesPerView = 4;
const spaceBetween = 24;

const slides = computed(() => elementData.getData('products') ?? []);

const onProductView = (product: Schemas['Product'], index: string | number) => {
    console.log(1111, routeName.value);
    if (routeName.value === 'frontend.home.page') {
        trackPromotionView(product.cover?.media.fileName ?? '', product, Number(index));
    }
};
const onProductSelect = (product: Schemas['Product'], index: string | number) => {
    if (routeName.value === 'frontend.home.page') {
        trackSelectPromotion(product.cover?.media.fileName ?? '', product, Number(index));
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
                :auto-slide="autoSlide"
                :navigation-arrows="navigation"
                :navigation-dots="false"
                :slides-per-view="slidesPerView"
                :space-between="spaceBetween"
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
