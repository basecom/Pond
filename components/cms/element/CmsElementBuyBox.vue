<script setup lang="ts">
import type { CmsElementBuyBox } from '@shopware-pwa/composables-next';
import SharedProductAddToCart from '~/components/shared/SharedProductAddToCart.vue';
const props = defineProps<{
    element: CmsElementBuyBox;
}>();

const { product } = useProduct(props.element.data.product);
</script>

<template>
    <div class="relative flex flex-wrap justify-between gap-6 items-end">
        <ProductVariantSelection :product="product" />

        <SharedPrice :product="product" />

        <span class="text-gray">
            {{ product.productNumber }}
        </span>

        <SharedProductAddToCart :product="product" />
    </div>
</template>
