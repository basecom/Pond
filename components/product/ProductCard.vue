<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';
const { pushError, pushSuccess } = useNotifications();

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
    try {
        await addProduct({ id });

        pushSuccess(props.product.translated.name + ' was added to your cart.');
    } catch (error) {
        pushError('An error occured trying to add ' + props.product.translated.name + ' to your cart.');
    }

    await refreshCart();
};
</script>

<template>
    <div class="shadow-md p-4 rounded-md">
        <NuxtLink
            :to="getProductRoute(product)"
            class="group"
        >
            <div class="flex flex-col">
                <div
                    class="aspect-h-1 aspect-w-1 bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg"
                >
                    <img
                        :src="cover.url"
                        :alt="cover.alt"
                        class="aspect-square h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>

                <div class="flex justify-between">
                    <div class="flex flex-col gap-4 pb-4">
                        <h3 class="mt-4 line-clamp-2 h-2lh">
                            {{ getTranslatedProperty(product, 'name') }}
                        </h3>

                        <p
                            v-if="layout === 'standard'"
                            class="line-clamp-2 text-sm h-2lh"
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

        <div>
            <ProductAddToCart :product="product" :label="false" :icon="true" />
        </div>
    </div>
</template>
