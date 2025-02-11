<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../../types/listing/filter';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
const { priceFilterApplied, propertyFilterApplied, propertyFilterAppliedTotal } =
    useProductListingCriteriaStore('category');

defineProps<{
    filter: ListingFilter;
    selectedFilters: Schemas['ProductListingResult']['currentFilters'];
    showResetButton?: boolean;
}>();
</script>

<template>
    <button class="flex items-center justify-between border-b border-brand-primary py-2.5 text-start">
        <span>
            <template v-if="filter.code === 'properties'">
                {{ getTranslatedProperty(filter, 'name') }}
            </template>
            <template v-else>
                {{ $t(`listing.sidebar.filter.${filter.code}.title`) }}
            </template>
        </span>
        <UtilityPill
            v-if="filter.code === 'price' && priceFilterApplied()"
            :number="1"
        />
        <UtilityPill
            v-else-if="filter.code === 'properties' && propertyFilterApplied(filter.id)"
            :number="propertyFilterAppliedTotal(filter.id)"
        />
    </button>
</template>
