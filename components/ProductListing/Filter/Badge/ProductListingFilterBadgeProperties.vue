<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import { useListingStore } from '~/stores/ListingStore';
import type { RemoveFilterEvent } from '~/types/listing/FilterEvents';

defineProps<{
    filter: string[];
}>();

defineEmits<{
    'remove-filter': [event: RemoveFilterEvent];
}>();

const listingStore = useListingStore('category');
</script>

<template>
    <template
        v-for="property in filter"
        :key="property"
    >
        <UtilityBadge
            v-if="listingStore.getPropertyOption(property)"
            :content="getTranslatedProperty(listingStore.getPropertyOption(property), 'name')"
            size="sm"
            suffix-icon="x"
            type="gray"
            class="cursor-pointer"
            @click="$emit('remove-filter', { code: 'properties', value: property })"
        />
    </template>
</template>
