<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useListingStore } from '~/stores/ListingStore';
import type { RemoveFilterEvent } from '~/types/listing/FilterEvents';

defineProps<{
    filter: Schemas['ProductListingResult']['currentFilters']['price'];
}>();

defineEmits<{
    'remove-filter': [event: RemoveFilterEvent];
}>();

const listingStore = useListingStore('category');
</script>

<template>
    <UtilityBadge
        v-if="listingStore.isPriceFilterApplied()"
        :content="`${filter.min} - ${filter.max}`"
        size="md"
        suffix-icon="x"
        type="gray"
        class="cursor-pointer"
        @click="$emit('remove-filter', { code: 'price', value: null })"
    />
</template>
