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
const { addProduct, refreshCart } = useCart();

const cover = getProductCover(props.product.cover);
const addProductAndRefresh = async (id: string) => {
    await addProduct({ id });
    refreshCart();
};
</script>

<template>
    <NuxtLink
        :to="getProductRoute(product)"
        class="group"
    >
        <div class="flex h-full flex-col">
            <div
                class="aspect-h-1 aspect-w-1 bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg"
            >
                <img
                    :src="cover.url"
                    :alt="cover.alt"
                    class="aspect-square h-full w-full object-cover object-center group-hover:opacity-75"
                />
            </div>

            <div class="flex flex-1 justify-between">
                <div class="flex flex-col">
                    <h3 class="mt-4 line-clamp-2">
                        {{ getTranslatedProperty(product, 'name') }}
                    </h3>

                    <p
                        v-if="layout === 'standard'"
                        class="line-clamp-2 text-sm"
                    >
                        {{ getTranslatedProperty(product, 'description') }}
                    </p>

                    <p class="mt-auto pt-6 text-lg font-medium">
                        <ProductPrice :product="product" />
                    </p>
                </div>

                <div class="self-end">
                    <FormKit
                        type="button"
                        @click.prevent="addProductAndRefresh(product.id)"
                    >
                        <FormKitIcon
                            icon="cart"
                            class="h-4 w-4"
                        />
                    </FormKit>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>
