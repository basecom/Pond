<script setup lang="ts">
import type { CmsElementProductBox } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';
import type { PromotionInfo } from '../../../types/analytics/promotion';

const props = defineProps<{
    element: CmsElementProductBox;
}>();

const { product } = useProduct(props.element.data.product);
const { trackPromotionView, trackSelectPromotion } = useAnalytics();
const { isHomePage } = useHomePage();

const getPromotion = (product: Schemas['Product']): PromotionInfo => {
    return {
        creative_name: product.cover?.media.fileName ?? '',
        creative_slot: props.element?.type ?? '',
        promotion_id: props.element?.blockId ?? '',
        promotion_name: props.element?.type ?? '',
    }
};

const onProductView = () => {
    if (isHomePage.value) {
        trackPromotionView(getPromotion(product.value), product.value);
    }
};
const onProductSelect = () => {
    if (isHomePage.value) {
        trackSelectPromotion(getPromotion(product.value), product.value);
    }
};
</script>

<template>
    <ProductCard :product="product" @view-product="onProductView()" @select-product="onProductSelect()" />
</template>
