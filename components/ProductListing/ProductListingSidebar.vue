<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '~/types/listing/Filter';
import type { RemoveFilterEvent } from '~/types/listing/FilterEvents';

withDefaults(
    defineProps<{
        filters: ListingFilter[];
        selectedFilters: Schemas['ProductListingResult']['currentFilters']|null;
        showResetButton?: boolean;
        sortingOptions: Schemas['ProductListingResult']['availableSortings'];
        selectedSorting: Schemas['ProductListingResult']['sorting'];
        containerClass?: string;
        productListingStoreKey?: string;
    }>(),
    {
        showResetButton: true,
        containerClass: '',
        productListingStoreKey: 'category',
    },
);

const emit = defineEmits<{
    'sorting-changed': [sortingOption: Schemas['ProductListingResult']['sorting']];
    'filter-changed': [key: Schemas['ProductListingResult']['currentFilters']];
    'reset-filters': [];
    'remove-filter': [event:RemoveFilterEvent];
}>();
</script>

<template>
    <div class="m-0 mx-auto grid gap-4" :class="containerClass">
        <div class="flex justify-end border-b border-gray-light pb-6 pt-2">
            <ProductListingSorting
                :options="sortingOptions"
                :selected-option="selectedSorting"
                @sorting-changed="
                    (sorting: Schemas['ProductListingResult']['sorting']) => emit('sorting-changed', sorting)
                "
            />
        </div>

        <ProductListingFilters
            :filters="filters"
            :selected-filters="selectedFilters"
            :show-reset-button="showResetButton"
            :product-listing-store-key="productListingStoreKey"
            @filter-changed="
                (filters: Schemas['ProductListingResult']['currentFilters']) => $emit('filter-changed', filters)
            "
            @reset-filters="$emit('reset-filters')"
            @remove-filter="(event: RemoveFilterEvent) => $emit('remove-filter', event)"
        />
    </div>
</template>
