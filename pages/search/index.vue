<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { RemoveFilterEvent } from '~/types/listing/FilterEvents';
import { useListingStore } from '~/stores/ListingStore';

const route = useRoute();
const { t } = useI18n();

const { getCurrentListing, getElements: products, loading, search, setInitialListing } = useProductSearchListing();
const listingStore = useListingStore('search');
const { listingState } = storeToRefs(listingStore);

const cacheKey = computed(() => `productSearch-${JSON.stringify(listingState.value.criteria)}`);

const { trackSelectItem } = useAnalytics({ trackPageView: true, pageType: 'search' });
const searchStore = useSearchStore();
const searchTerm = computed(() => {
    if (searchStore.searchTerm.length < 3) {
        return searchStore.lastValidSearchTerm !== '' ? searchStore.lastValidSearchTerm : route.query.search;
    }

    return searchStore.searchTerm;
});

const loadProducts = async (cacheKey: string) => {
    const { data: productSearch } = await useAsyncData(cacheKey, async () => {
        await search(listingState.value.criteria);
        listingStore.setSearchResult(getCurrentListing.value);

        return getCurrentListing.value;
    });

    return productSearch;
};

const changePage = async (page: number) => {
    listingStore.setPage(page);
};

const onSortChange = async (sorting: Schemas['ProductListingResult']['sorting']) => {
    listingStore.setSorting(sorting);
};

const onFilterChange = async (filters: Schemas['ProductListingResult']['currentFilters']) => {
    listingStore.setFilters(filters);
};

const onResetFilters = async () => {
    listingStore.resetFilters();
};

const onRemoveFilter = async (removeFilterEvent: RemoveFilterEvent) => {
    listingStore.removeFilter(removeFilterEvent);
};

const onSelectProduct = async (product: Schemas['Product']) => {
    trackSelectItem(product, { id: 'search', name: 'search' });
};

listingStore.initializeCriteria(
    {
        search: route.query.search as string,
        associations: {
            children: {
                associations: {
                    cover: {},
                },
            },
            media: {},
            manufacturer: {},
            options: {},
        },
    },
    route.query,
);

const productSearch = await loadProducts(cacheKey.value);
setInitialListing(productSearch.value as Schemas['ProductListingResult']);
listingStore.setSearchResult(productSearch.value as Schemas['ProductListingResult'], true);

watch(
    cacheKey,
    () => {
        loadProducts(cacheKey.value);
        // TODO: Works for backwards but not forwards to update listing, also needs to update searchTerm input and "Results for ..." display
    },
    { immediate: false },
);

watch(
    () => route.query,
    () => {
        // TODO: changing the searchTerm does not re-render the filters
        listingStore.updateCriteria(route.query);
    },
);

useBreadcrumbs([
    {
        name: t('search.resultPage.breadcrumbName'),
        path: `/search?search=${route.query.search}`,
    },
]);
</script>

<template>
    <div class="container">
        <h1 class="mb-6 text-center">
            <span v-if="products?.length">
                {{ $t('search.resultPage.heading') }}

                <strong> "{{ searchTerm }}" </strong>
            </span>

            <span v-else>
                {{ $t('search.resultPage.headingNoResults') }}
            </span>
        </h1>

        <div class="flex flex-wrap gap-4">
            <div class="w-full">
                <ProductListingSidebar
                    v-if="listingState.filters.all"
                    :filters="listingState.filters.all"
                    :selected-filters="listingState.filters.applied"
                    :show-reset-button="listingState.filters.modified"
                    :sorting-options="listingState.sorting.options"
                    :selected-sorting="listingState.sorting.current ?? 'name-asc'"
                    product-listing-store-key="search"
                    @sorting-changed="onSortChange"
                    @filter-changed="onFilterChange"
                    @reset-filters="onResetFilters"
                    @remove-filter="(event: RemoveFilterEvent) => onRemoveFilter(event)"
                />
            </div>

            <div
                v-if="!loading"
                class="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
                <template
                    v-for="product in products"
                    :key="product.id"
                >
                    <ProductCard
                        :product="product"
                        @select-product="onSelectProduct(product)"
                    />
                </template>
            </div>
        </div>

        <LayoutPagination
            :total="listingState.pagination.total ?? 0"
            :items-per-page="listingState.pagination.limit ?? 24"
            :default-page="listingState.pagination.page ?? 1"
            @update-page="(currentPage: number) => changePage(currentPage)"
        />
    </div>
</template>
