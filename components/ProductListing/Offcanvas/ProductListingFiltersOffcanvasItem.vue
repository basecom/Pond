<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../../types/listing/filter';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

defineProps<{
    filter: ListingFilter;
    selectedFilters: Schemas['ProductListingResult']['currentFilters'];
    showResetButton?: boolean;
}>();
</script>

<template>
    <button class="border-b border-brand-primary py-2.5 text-start">
        <template v-if="filter.code === 'properties'">
            {{ getTranslatedProperty(filter, 'name') }}
        </template>
        <template v-else>
            {{ $t(`listing.sidebar.filter.${filter.code}.title`) }}
        </template>
    </button>
</template>
