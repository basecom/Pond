<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

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
    'reset-filter': [key: string];
    'remove-filter': [
        event: {
            code: 'properties';
            value: ValueOf<Schemas['PropertyGroupOption']['id'] | null>;
        },
    ];
}>();
</script>

<template>
    <div
        class="m-0 mx-auto grid gap-4"
        :class="{ 'px-5': !fullWidth }"
    >
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
            @filter-changed="$event => $emit('filter-changed', $event)"
            @reset-filters="$emit('reset-filters')"
            @reset-filter="$event => $emit('reset-filter', $event)"
            @remove-filter="$event => $emit('remove-filter', $event)"
        />
    </div>
</template>
