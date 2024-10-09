<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = withDefaults(
    defineProps<{
        product: Schemas['Product'];
        layout?: 'standard' | 'minimal';
    }>(),
    {
        layout: 'standard',
    },
);

const { getProductCover } = useMedia();

const cover = getProductCover(props.product.cover);
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');
</script>

<template>
    <div class="relative rounded-md p-4 shadow-md">
        <div
            v-if="wishlistEnabled"
            class="absolute right-0 top-0 z-[2] p-4"
        >
            <ProductAddToWishlist :product-id="props.product.id" />
        </div>
        <NuxtLink
            :to="getProductRoute(product)"
            class="group"
        >
            <div class="flex flex-col">
                <div
                    class="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-light"
                >
                    <template v-if="cover.placeholder">
                        <SharedImagePlaceholder />
                    </template>

                    <template v-else>
                        <img
                            :src="cover.url"
                            :alt="cover.alt"
                            class="aspect-square h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                    </template>
                </div>

                <div class="flex justify-between">
                    <div class="flex flex-col gap-4 pb-4">
                        <h3 class="mt-4 line-clamp-2 h-2lh">
                            {{ getTranslatedProperty(product, 'name') }}
                        </h3>

                        <p
                            v-if="layout === 'standard'"
                            class="line-clamp-2 h-2lh text-sm"
                        >
                            {{ getTranslatedProperty(product, 'description') }}
                        </p>

                        <p class="text-lg font-medium">
                            <ProductPrice :product="product" />
                        </p>
                    </div>
                </div>
            </div>
        </NuxtLink>

        <template v-if="product.childCount > 0">
            <ProductGoToDetail :product="product" />
        </template>

        <template v-else>
            <ProductAddToCart
                :product="product"
                :label="false"
                :icon="true"
            />
        </template>
    </div>
</template>
