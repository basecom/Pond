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

        <ProductAvailability :product="product" />

        <div class="flex w-full flex-row gap-4">
            <ProductAddToCart
                :product="product"
                :label="true"
            />
            <div class="rounded-md border border-gray-medium bg-white">
                <ProductAddToWishlist :productId="product.id" />
            </div>
        </div>
    </div>
</template>
