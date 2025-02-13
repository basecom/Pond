<script setup lang="ts">
import type { CmsElementProductBox } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';
import type { PromotionInfo } from '~/types/analytics/Promotion';

const props = defineProps<{
    element: CmsElementProductBox;
}>();

const { getCmsElementData } = useCmsUtils();
const productData = getCmsElementData(props.element, 'product');
const { product } = useProduct(productData);

const { trackPromotionView, trackSelectPromotion, trackSelectItem } = useAnalytics();
const { isHomePage } = useHomePage();

const getPromotion = (product: Schemas['Product']): PromotionInfo => ({
    creative_name: product.cover?.media.fileName ?? '',
    creative_slot: props.element?.type ?? '',
    promotion_id: props.element?.blockId ?? '',
    promotion_name: props.element?.type ?? '',
});

const onProductView = () => {
    if (!product.value) {
        return;
    }

    if (isHomePage.value) {
        trackPromotionView(getPromotion(product.value), product.value);
    }
};
const onProductSelect = () => {
    if (!product.value) {
        return;
    }

    if (isHomePage.value) {
        trackSelectPromotion(getPromotion(product.value), product.value);
        return;
    }

    trackSelectItem(product.value, { id: props.element?.blockId, name: props.element?.type });
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
