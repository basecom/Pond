<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const route = useRoute();
const { t } = useI18n();

const { getCurrentListing, getElements: products, loading, search, setInitialListing } = useProductSearchListing();
const productListingCriteriaStore = useProductListingCriteriaStore('search');
const { criteria, sortingOptions, currentSorting, appliedFilters, areFiltersModified, total, limit, filters, page } =
    storeToRefs(productListingCriteriaStore);

const cacheKey = computed(() => `productSearch-${JSON.stringify(criteria.value)}`);

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
        await search(criteria.value);
        productListingCriteriaStore.setSearchResult(getCurrentListing.value);

        return getCurrentListing.value;
    });

    return productSearch;
};

const changePage = async (page: number) => {
    productListingCriteriaStore.setPage(page);
};

const onSortChange = async (sorting: Schemas['ProductListingResult']['sorting']) => {
    productListingCriteriaStore.setSorting(sorting);
};

const onFilterChange = async (filters: Schemas['ProductListingResult']['currentFilters']) => {
    productListingCriteriaStore.setFilters(filters);
};

const onResetFilters = async () => {
    productListingCriteriaStore.resetFilters();
};

const onSelectProduct = async (product: Schemas['Product']) => {
    trackSelectItem(product, { id: 'search', name: 'search' });
}

productListingCriteriaStore.initializeCriteria(
    {
        search: route.query.search as string,
        associations: {
            children: {},
            media: {},
            manufacturer: {},
            options: {},
        }
    },
    route.query,
);

const productSearch = await loadProducts(cacheKey.value);
setInitialListing(productSearch.value as Schemas['ProductListingResult']);
productListingCriteriaStore.setSearchResult(productSearch.value as Schemas['ProductListingResult'], true);

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
        productListingCriteriaStore.updateCriteria(route.query);
    },
);

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

                <strong> "{{ searchTerm }}" </strong>
            </span>

            <span v-else>
                {{ $t('search.resultPage.headingNoResults') }}
            </span>
        </h1>

        <div class="flex flex-wrap">
            <div class="w-full md:w-5/12 lg:w-3/12">
                <ProductListingSidebar
                    v-if="appliedFilters && products?.length"
                    :filters="filters"
                    :selected-filters="appliedFilters"
                    :full-width="false"
                    :show-reset-button="areFiltersModified"
                    :sorting-options="sortingOptions"
                    :sorting="currentSorting"
                    @sorting-changed="onSortChange"
                    @filter-changed="onFilterChange"
                    @reset-filters="onResetFilters"
                />
            </div>
            <div
                v-if="!loading"
                class="grid w-full grid-cols-2 gap-6 md:w-7/12 md:grid-cols-3 lg:w-9/12 lg:grid-cols-4"
            >
                <template
                    v-for="product in products"
                    :key="product.id"
                >
                    <ProductCard :product="product" @select-product="onSelectProduct(product)" />
                </template>
            </div>
        </div>

        <LayoutPagination
            v-if="products?.length"
            :total="total ?? 0"
            :items-per-page="limit"
            :default-page="page"
            @update-page="currentPage => changePage(currentPage)"
        />
    </div>
</template>
