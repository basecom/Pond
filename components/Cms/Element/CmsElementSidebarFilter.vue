<script setup lang="ts">
import type { CmsElementSidebarFilter } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    element: CmsElementSidebarFilter;
}>();

const route = useRoute();
const { getCurrentListing, search } = useCategoryListing();
// TODO create a better ID based on the CmsPage or even better CmsSlot identifier
const productListingCriteriaStore = useProductListingCriteriaStore('category');

const { criteria, sortingOptions, currentSorting, appliedFilters, areFiltersModified, filters } =
    storeToRefs(productListingCriteriaStore);

const onSortChange = async (sorting: Schemas['ProductListingResult']['sorting']) => {
    productListingCriteriaStore.setSorting(sorting);
    await search(criteria.value);
    productListingCriteriaStore.setSearchResult(getCurrentListing.value as Schemas['ProductListingResult']);
};

const onFilterChange = async (filters: Schemas['ProductListingResult']['currentFilters']) => {
    productListingCriteriaStore.setFilters(filters);
    await search(criteria.value);
    productListingCriteriaStore.setSearchResult(getCurrentListing.value as Schemas['ProductListingResult']);
};

const onResetFilters = async () => {
    productListingCriteriaStore.resetFilters();
    await search(criteria.value);
    productListingCriteriaStore.setSearchResult(getCurrentListing.value as Schemas['ProductListingResult']);
};

watch(
    () => route.query,
    async () => {
        productListingCriteriaStore.updateCriteria(route.query);
        await search(criteria.value);
        productListingCriteriaStore.setSearchResult(getCurrentListing.value as Schemas['ProductListingResult']);
    },
);
</script>

<template>
    <div class="mx-auto max-w-screen-xl">
        <ProductListingSidebar
            v-if="appliedFilters"
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
</template>
