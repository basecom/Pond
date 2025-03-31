<script setup lang="ts">
import type { CmsElementSidebarFilter } from '@shopware-pwa/composables-next';
import type { Schemas } from '@shopware/api-client/api-types';
import { useListingStore } from '~/stores/ListingStore';
import type { RemoveFilterEvent } from '~/types/listing/FilterEvents';

defineProps<{
    element: CmsElementSidebarFilter;
}>();

const route = useRoute();
const { getCurrentListing, search } = useCategoryListing();

const listingStore = useListingStore('category');
const { listingState } = storeToRefs(listingStore);

const onResetFilters = async () => {
    listingStore.resetFilters();
};

const onRemoveFilter = async (removeFilterEvent: RemoveFilterEvent) => {
    listingStore.removeFilter(removeFilterEvent);
};

watch(
    () => route.query,
    async () => {
        listingStore.updateCriteria(route.query);
        await search(listingState.value.criteria);
        listingStore.setSearchResult(getCurrentListing.value as Schemas['ProductListingResult']);
    },
);
</script>

<template>
    <ProductListingSidebar
        v-if="listingState.filters.all"
        :filters="listingState.filters.all"
        :selected-filters="listingState.filters.applied"
        :show-reset-button="listingState.filters.modified"
        :sorting-options="listingState.sorting.options"
        :selected-sorting="listingState.sorting.current"
        @sorting-changed="(sortingOption: Schemas['ProductListingResult']['sorting']) => listingStore.setSorting(sortingOption)"
        @filter-changed="(filters: Schemas['ProductListingResult']['currentFilters']) => listingStore.setFilters(filters)"
        @reset-filters="onResetFilters"
        @remove-filter="(event: RemoveFilterEvent) => onRemoveFilter(event)"
    />

    <!-- Filter Skeleton Loader -->
    <!-- TODO: Also become visible when navigating between listing pages -->
    <template v-if="!listingState.filters.all">
        <div class="h-10 mb-10 rounded animate-pulse w-32 ml-auto bg-gray-medium" />
        <div class="flex gap-2 mr-auto">
            <div class="h-10 mb-5 rounded animate-pulse w-32 bg-gray-medium" />
            <div class="h-10 mb-5 rounded animate-pulse w-32 bg-gray-medium" />
            <div class="h-10 mb-5 rounded animate-pulse w-32 bg-gray-medium" />
        </div>
    </template>
</template>
