<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useListingStore } from '~/stores/ListingStore';
import type { RemoveFilterEvent } from '~/types/listing/FilterEvents';

const props = withDefaults(
    defineProps<{
        filter: Schemas['ProductListingResult']['currentFilters']['price'];
        productListingStoreKey?: string;
    }>(),
    {
        productListingStoreKey: 'category',
    },
);

defineEmits<{
    'remove-filter': [event: RemoveFilterEvent];
}>();

const listingStore = useListingStore(props.productListingStoreKey);
const { currency } = useSessionContext();
</script>

<template>
    <UtilityBadge
        v-if="listingStore.isPriceFilterApplied()"
        :content="`${filter.min}${currency?.symbol} - ${filter.max}${currency?.symbol}`"
        size="md"
        suffix-icon="x"
        type="gray"
        class="cursor-pointer"
        @click="$emit('remove-filter', { code: 'price', value: null })"
    />
</template>
