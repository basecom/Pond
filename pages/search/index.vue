<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const route = useRoute();
const { t } = useI18n();

const { getCurrentListing, getElements: products, loading, search, setInitialListing } = useProductSearchListing();

const limit = ref(route.query.limit ? Number(route.query.limit) : 12);
const cacheKey = computed(() => `productSearch-${JSON.stringify(route.query)}`);

const searchStore = useSearchStore();
const searchTerm = computed(() => {
    if (searchStore.searchTerm.length < 3) {
        return searchStore.lastValidSearchTerm !== "" ? searchStore.lastValidSearchTerm : route.query.search;
    }

    return searchStore.searchTerm;
});

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

useBreadcrumbs([
    {
        name: t('search.resultPage.breadcrumbName'),
        path: '/search?search=' + route.query.search,
    },
]);
</script>

<template>
    <div class="container">
        <h1 class="mb-6 text-center">
            <span v-if="products?.length">
                {{ $t('search.resultPage.heading') }}

                <strong>
                    "{{ searchTerm }}"
                </strong>
            </span>

            <span v-else>
                {{ $t('search.resultPage.headingNoResults') }}
            </span>
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
