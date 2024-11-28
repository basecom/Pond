<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';

const props = defineProps<{
    filters: ListingFilter[];
    selectedFilters: Schemas['ProductListingResult']['currentFilters'];
    showResetButton?: boolean;
    fullWidth?: boolean;
    sortingOptions: Schemas['ProductListingResult']['availableSortings'];
    sorting: Schemas['ProductListingResult']['sorting'];
}>();

const emit = defineEmits<{
    'sorting-changed': [key: Schemas['ProductListingResult']['sorting']];
    'filter-changed': [key: Schemas['ProductListingResult']['currentFilters']];
    'reset-filters': [];
}>();
</script>

<template>
    <div class="m-0 mx-auto">
        <div class="flex items-baseline justify-between border-b border-gray-light py-6">
            <div class="text-4xl">
                {{ $t('listing.sidebar.title') }}
            </div>

            <ProductListingSorting
                :options="props.sortingOptions"
                :selected-option="props.sorting"
                @sorting-changed="emit('sorting-changed', $event)"
            />
        </div>

        <ProductListingFilters
            :filters="props.filters"
            :selected-filters="props.selectedFilters"
            :show-reset-button="props.showResetButton"
            @filter-changed="$emit('filter-changed', $event)"
            @reset-filters="$emit('reset-filters')"
        />
    </div>
</template>
