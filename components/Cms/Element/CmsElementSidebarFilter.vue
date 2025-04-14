<script setup lang="ts">
import type { CmsElementSidebarFilter } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';
import { useListingStore } from '~/stores/ListingStore';
import type { RemoveFilterEvent } from '~/types/listing/FilterEvents';

const props = withDefaults(
    defineProps<{
        element: CmsElementSidebarFilter;
        productListingStoreKey?: string;
    }>(),
    {
        productListingStoreKey: 'category',
    },
);

const route = useRoute();
const { getCurrentListing, search } = useCategoryListing();

const listingStore = useListingStore(props.productListingStoreKey);
const { listingState } = storeToRefs(listingStore);

const onResetFilters = async () => {
    listingStore.resetFilters();
};

const onRemoveFilter = async (removeFilterEvent: RemoveFilterEvent) => {
    listingStore.removeFilter(removeFilterEvent);
};

watch(
    () => route.query,
    async (newQuery) => {
        const pageNotChanged = listingState.value.pagination.page?.toString() === newQuery.p;

        listingStore.displayCardSkeleton = true;
        listingStore.displayPaginationSkeleton = pageNotChanged;
        listingStore.updateCriteria(newQuery, pageNotChanged);

        await search(listingState.value.criteria);
        listingStore.setSearchResult(getCurrentListing.value as Schemas['ProductListingResult'], true);
        listingStore.displayCardSkeleton = false;
        listingStore.displayPaginationSkeleton = false;
    },
);
</script>

<template>
    <template v-if="listingStore.isLoading || listingStore.displayFilterSkeleton">
        <ClientOnly>
            <LayoutSkeletonCmsElementSidebarFilter />
        </ClientOnly>
    </template>

    <ProductListingSidebar
        v-else-if="listingState.filters.all"
        :filters="listingState.filters.all"
        :selected-filters="listingState.filters.applied"
        :show-reset-button="listingState.filters.modified"
        :sorting-options="listingState.sorting.options"
        :selected-sorting="listingState.sorting.current"
        :product-listing-store-key="productListingStoreKey"
        @sorting-changed="(sortingOption: Schemas['ProductListingResult']['sorting']) => listingStore.setSorting(sortingOption)"
        @filter-changed="(filters: Schemas['ProductListingResult']['currentFilters']) => listingStore.setFilters(filters)"
        @reset-filters="onResetFilters"
        @remove-filter="(event: RemoveFilterEvent) => onRemoveFilter(event)"
    />
</template>
