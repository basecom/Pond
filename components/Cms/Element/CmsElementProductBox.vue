<script setup lang="ts">
import type { CmsElementProductBox } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';
import type { PromotionInfo } from '../../../types/analytics/promotion';

const props = defineProps<{
    element: CmsElementProductBox;
}>();

const elementData = useCmsElementData(props.element);
const productData = elementData.getData('product');

const { product } = productData ? useProduct(productData) : {};
const { trackPromotionView, trackSelectPromotion, trackSelectItem } = useAnalytics();
const { isHomePage } = useHomePage();

const getPromotion = (product: Schemas['Product']): PromotionInfo => {
    return {
        creative_name: product.cover?.media.fileName ?? '',
        creative_slot: props.element?.type ?? '',
        promotion_id: props.element?.blockId ?? '',
        promotion_name: props.element?.type ?? '',
    };
};

const onProductView = () => {
    if (isHomePage.value) {
        trackPromotionView(getPromotion(product.value), product.value);
    }
};
const onProductSelect = () => {
    if (isHomePage.value) {
        trackSelectPromotion(getPromotion(product.value), product.value);
    } else {
        trackSelectItem(product.value, { id: props.element?.blockId, name: props.element?.type });
    }
};
</script>

<template>
    <ProductCard
        v-if="product"
        :product="product"
        @view-product="onProductView()"
        @select-product="onProductSelect()"
    />
</template>
