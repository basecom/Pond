<script setup lang="ts">
import type { CmsElementBuyBox } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementBuyBox;
}>();

const { product } = useProduct(props.element.data.product);
</script>

<template>
    <div class="relative flex flex-wrap items-end justify-between gap-6">
        <ProductVariantSelection :product="product" />

        <ProductPrice :product="product" />

        <span class="text-gray">
            {{ product.productNumber }}
        </span>

       <div class="flex flex-row w-full gap-4">
        <ProductAddToCart
            :product="product"
            :label="true"
        />
        <div class="rounded-md border border-gray-medium bg-white">
            <SharedAddToWishlist :productId="product.id"></SharedAddToWishlist>
        </div>
       </div>
    </div>
</template>
