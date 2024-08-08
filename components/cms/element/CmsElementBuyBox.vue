<script setup lang="ts">
import type { CmsElementBuyBox } from '@shopware-pwa/composables-next';
import SharedProductAddToCart from '~/components/shared/SharedProductAddToCart.vue';
const props = defineProps<{
    element: CmsElementBuyBox;
}>();

const { product } = useProduct(props.element.data.product);
</script>

<template>
    <div class="flex flex-wrap justify-between gap-4">
        <!-- Variant Selection here -->
        <ProductVariantSelection :product="product" />

        <SharedPrice :product="product" />

        <SharedProductAddToCart :product="product" />
    </div>
</template>
