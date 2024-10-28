<script setup lang="ts">
import type { CmsElementProductBox } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementProductBox;
}>();

const { product } = useProduct(props.element.data.product);
const { trackPromotionView, trackSelectPromotion } = useAnalytics();
const { routeName } = useNavigationContext();

const onProductView = (product: Schemas['Product']) => {
    if (routeName.value === 'frontend.home.page') {
        trackPromotionView(product.cover?.media.fileName ?? '', product);
    }
};
const onProductSelect = (product: Schemas['Product']) => {
    if (routeName.value === 'frontend.home.page') {
        trackSelectPromotion(product.cover?.media.fileName ?? '', product);
    }
};
</script>

<template>
    <ProductCard :product="product" @view-product="onProductView" @select-product="onProductSelect" />
</template>
