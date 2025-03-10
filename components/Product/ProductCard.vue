<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getProductRoute, getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = withDefaults(
    defineProps<{
        product: Schemas['Product'];
        layout?: 'standard' | 'minimal' | 'image';
        displayMode?: 'standard' | 'cover' | 'contain';
        containerClass?: string;
    }>(),
    {
        layout: 'standard',
        displayMode: 'cover',
        containerClass: '',
    },
);

const emit = defineEmits(['select-product', 'view-product', 'image-loaded']);

const { getProductCover } = useMedia();

const productCard = ref(null);
const cover = getProductCover(props.product.cover?.media);
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');

const { stop } = useIntersectionObserver(productCard, ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting) {
        emit('view-product');
        stop();
    }
});
</script>

<template>
    <div
        ref="productCard"
        class="relative w-full border border-gray-medium"
        :class="containerClass"
    >
        <div
            v-if="wishlistEnabled"
            class="absolute right-0 top-0 z-10 p-4"
        >
            <ProductAddToWishlist :product="props.product" />
        </div>

        <LocaleLink
            :to="getProductRoute(product)"
            class="group"
            @click="$emit('select-product')"
        >
            <div class="flex flex-col">
                <div class="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden bg-gray-light">
                    <template v-if="cover.placeholder">
                        <SharedImagePlaceholder @load-icon="$emit('image-loaded')" />
                    </template>

                    <template v-else>
                        <img
                            :src="cover.url"
                            :alt="cover.alt ?? getTranslatedProperty(props.product, 'name')"
                            :title="cover.title ?? getTranslatedProperty(props.product, 'name')"
                            class="aspect-square size-full object-center group-hover:opacity-75"
                            :class="displayMode === 'standard' ? 'object-scale-down' : 'object-' + displayMode"
                            @load="$emit('image-loaded')"
                            @error="$emit('image-loaded')"
                        >
                    </template>
                </div>

                <div class="flex justify-between p-4">
                    <div class="flex flex-col gap-2 pb-4">
                        <h3 class="line-clamp-2 h-2lh">
                            {{ getTranslatedProperty(product, 'name') }}
                        </h3>

                        <p
                            v-if="layout === 'standard'"
                            class="line-clamp-2 h-2lh text-sm text-gray"
                        >
                            {{ getTranslatedProperty(product, 'description') }}
                        </p>

                        <p class="text-lg font-medium">
                            <ProductPrice :product="product" />
                        </p>
                    </div>
                </div>
            </div>
        </LocaleLink>

        <template v-if="product.childCount && product.childCount > 0">
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
