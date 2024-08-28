<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{ product: Schemas["Product"] }>();
const { product } = toRefs(props);

const { getProductCover } = useMedia();
const productCover = getProductCover(props.product.cover, 'xs');
</script>

<template>
    <div
        class="border-b border-gray-medium p-4 text-sm flex items-center gap-3 hover:bg-gray-light cursor-pointer transition duration-300 bg-white"
    >
        <div
            class="rounded-sm p-1 border border-gray-medium"
        >
            <img
                loading="lazy"
                :src="productCover.url"
                class="min-h-10 h-10 min-w-10 w-10 object-cover"
                :alt="productCover.alt"
            />
        </div>

        <div class="flex items-center justify-between gap-5 grow">
            <div
                class="flex gap-y-4 flex-col"
            >
                <span class="overflow-hidden text-ellipsis line-clamp-1">
                    {{ product.translated.name }}
                </span>

                <span class="text-gray">
                    {{ product.productNumber }}
                </span>
            </div>

            <div class="flex-none text-right">
                <ProductPrice :product="product" :font-size="'text-lg'"/>
            </div>
        </div>
    </div>
</template>