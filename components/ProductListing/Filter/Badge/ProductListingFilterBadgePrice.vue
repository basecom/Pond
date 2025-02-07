<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    filter: Schemas['ProductListingResult']['currentFilters'];
}>();

defineEmits<{
    'reset-filter': [key: string];
    'remove-filter': [
        event: {
            code: 'price';
            value: null;
        },
    ];
}>();

const { priceFilterApplied } = useProductListingCriteriaStore('category');
</script>

<template>
    <UtilityBadge
        v-if="priceFilterApplied()"
        :content="`${filter.min} - ${filter.max}`"
        size="sm"
        suffix-icon="x"
        class="cursor-pointer"
        @click="$emit('remove-filter', { code: 'price', value: null })"
    />
</template>
