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
        class="m-0 mx-auto grid gap-4 mb-4"
    >
        <ProductListingFilters
            :filters="props.filters"
            :selected-filters="props.selectedFilters"
            :show-reset-button="props.showResetButton"
            @filter-changed="(filters: Schemas['ProductListingResult']['currentFilters']) => $emit('filter-changed', filters)"
            @reset-filters="$emit('reset-filters')"
            @reset-filter="$event => $emit('reset-filter', $event)"
            @remove-filter="$event => $emit('remove-filter', $event)"
        />

      <div
          class="flex justify-end">
      <ProductListingSorting
          :options="props.sortingOptions"
          :selected-option="props.sorting"
          @sorting-changed="(sorting: Schemas['ProductListingResult']['sorting']) => emit('sorting-changed', sorting)"
      />
      </div>
    </div>
</template>
