<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{ product: Schemas['Product'] }>();
const { product } = toRefs(props);

const { getProductCover } = useMedia();
const productCover = getProductCover(props.product.cover, 'xs');
</script>

<template>
    <div
        class="flex cursor-pointer items-center gap-3 border-b border-gray-medium bg-white p-4 text-sm transition duration-300 hover:bg-gray-light"
    >
        <div class="rounded-sm border border-gray-medium bg-gray-light p-1">
            <template v-if="productCover.placeholder">
                <div class="size-10 min-h-10 min-w-10">
                    <SharedImagePlaceholder :size="'xs'" />
                </div>
            </template>

            <template v-else>
                <img
                    loading="lazy"
                    :src="productCover.url"
                    class="size-10 min-h-10 min-w-10 object-cover"
                    :alt="productCover.alt"
                >
            </template>
        </div>

        <div class="flex grow items-center justify-between gap-5">
            <div class="flex flex-col gap-y-4">
                <span class="line-clamp-1 overflow-hidden text-ellipsis">
                    {{ product.translated.name }}
                </span>

                <span class="text-gray">
                    {{ product.productNumber }}
                </span>
            </div>

            <div class="flex-none text-right">
                <ProductPrice
                    :product="product"
                    :font-size="'text-lg'"
                />
            </div>
        </div>
    </div>
</template>
