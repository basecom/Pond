<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ValueOf } from '~/types/valueof';

const props = defineProps<{
    filter: Schemas['ProductListingResult']['currentFilters'];
}>();
console.log(props.filter);

defineEmits<{
    'reset-filter': [key: string];
    'remove-filter': [
        event: {
            code: 'price';
            value: null;
        },
    ];
}>();
const {priceFilterApplied} = useProductListingCriteriaStore('category');
</script>

<template>
    <UtilityBadge
        v-if="priceFilterApplied()"
        :content="`${filter.min} - ${filter.max}`"
        size="sm"
        suffix-icon="x"
        @click="$emit('remove-filter', {code: 'price', value: null})"
    />
</template>