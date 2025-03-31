<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import { useListingStore } from '~/stores/ListingStore';
import type { RemoveFilterEvent } from '~/types/listing/FilterEvents';

const props = withDefaults(
    defineProps<{
        filter: string[];
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
</script>

<template>
    <template
        v-for="property in filter"
        :key="property"
    >
        <UtilityBadge
            v-if="listingStore.getPropertyOption(property)"
            :content="getTranslatedProperty(listingStore.getPropertyOption(property), 'name')"
            size="md"
            suffix-icon="x"
            type="gray"
            class="cursor-pointer"
            @click="$emit('remove-filter', { code: 'properties', value: property })"
        />
    </template>
</template>
