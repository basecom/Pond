<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';

const { filters, fullWidth, sortingOptions, sorting, selectedFilters, showResetButton } = defineProps<{
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
    <div class="bg-white">
        <div
            class="m-0 mx-auto"
            :class="{ 'px-5': !fullWidth }"
        >
            <div class="flex items-baseline justify-between border-b border-gray-light py-6">
                <div class="text-gray-900 text-4xl">
                    {{ $t('listing.sidebar.title') }}
                </div>
                <ProductListingSorting
                    :options="sortingOptions"
                    :selected-option="sorting"
                    @sorting-changed="emit('sorting-changed', $event)"
                />
            </div>
            <ProductListingFilters
                :filters="filters"
                :selected-filters="selectedFilters"
                :show-reset-button="showResetButton"
                @filter-changed="$emit('filter-changed', $event)"
                @reset-filters="$emit('reset-filters')"
            />
        </div>
    </div>
</template>

<style scoped></style>
