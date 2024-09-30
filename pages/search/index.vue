<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';

const route = useRoute();
const { t } = useI18n();

const {
    getCurrentListing,
    getElements: products,
    loading,
    search,
    setInitialListing,
    getAvailableFilters,
    getSortingOrders,
    getCurrentSortingOrder,
    getCurrentFilters
} = useProductSearchListing();

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
const filters = computed(() => getAvailableFilters.value as ListingFilter[]);
const sortingOrders = computed(() => getSortingOrders.value as Schemas['ProductListingResult']['availableSortings']);

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
                {{ $t('search.resultPage.heading') }} <strong>"{{ searchTerm }}"</strong>
            </span>
            <span v-else>{{ $t('search.resultPage.headingNoResults') }}</span>
        </h1>

        <div class="flex flex-wrap">
            <div class="w-full md:w-5/12 lg:w-3/12">
                <ProductListingSidebar
                    :filters="filters"
                    :full-width="true"
                    :show-reset-button="true"
                    :sorting-options="sortingOrders"
                    :sorting="getCurrentSortingOrder"
                    :selected-filters="getCurrentFilters"
                />
            </div>
            <div
                v-if="!loading"
                class="grid w-full md:w-7/12 lg:w-9/12 grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
            >
                <template
                    v-for="product in products"
                    :key="product.id"
                >
                    <ProductCard :product="product" />
                </template>
            </div>
        </div>
    </div>
</template>
