<script setup lang="ts">
import type { CmsElementProductBox } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementProductBox;
}>();

const { product } = useProduct(props.element.data.product);
const { trackPromotionView, trackSelectPromotion } = useAnalytics();
const { isHomePage } = useHomePage();

const onProductView = () => {
    if (isHomePage.value) {
        trackPromotionView(product.value.cover?.media.fileName ?? '', product.value);
    }
};
const onProductSelect = () => {
    if (isHomePage.value) {
        trackSelectPromotion(product.value?.media.fileName ?? '', product.value);
    }
};
</script>

<template>
    <ProductCard :product="product" @view-product="onProductView()" @select-product="onProductSelect()" />
</template>
