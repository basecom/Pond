<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const route = useRoute();

const { getCurrentListing, getElements: products, loading, search, setInitialListing } = useProductSearchListing();

const limit = ref(route.query.limit ? Number(route.query.limit) : 12);
const cacheKey = computed(() => `productSearch-${JSON.stringify(route.query)}`);
const searchTerm = ref(route.query.search);

const loadProducts = async (cacheKey: string) => {
    const { data: productSearch } = await useAsyncData(cacheKey, async () => {
        await search({
            search: route.query.search as string,
            limit: limit.value,
            order: route.query.order ? (route.query.order as string) : 'name-asc',
        });

        return getCurrentListing.value;
    });

    return productSearch;
};

const productSearch = await loadProducts(cacheKey.value);

setInitialListing(productSearch.value as Schemas['ProductListingResult']);
</script>

<template>
    <div class="container">
        <h1 class="mb-6 text-center">
            <span v-if="products?.length">
                results for "<strong>{{ searchTerm }}</strong
                >"
            </span>
            <span v-else>no results</span>
        </h1>

        <div
            v-if="!loading"
            class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
            <template
                v-for="product in products"
                :key="product.id"
            >
                <ProductCard :product="product" />
            </template>
        </div>
    </div>
</template>
