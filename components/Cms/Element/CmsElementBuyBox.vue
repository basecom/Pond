<script setup lang="ts">
import type { CmsElementBuyBox } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementBuyBox;
}>();

const { product } = useProduct(props.element.data.product);
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');
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
            <ProductAddToCart :product="product" />
            <div
                v-if="wishlistEnabled"
                class="rounded-md border border-gray-medium bg-white"
            >
                <ProductAddToWishlist :product="product" />
            </div>
        </div>
    </div>
</template>
