<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ValueOf } from '~/types/valueof';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

defineProps<{
    filter: string[];
}>();

defineEmits<{
    'remove-filter': [
        event: {
            code: 'properties';
            value: ValueOf<Schemas['PropertyGroupOption']['id']>;
        },
    ];
}>();

const { propertyOptionForId } = useProductListingCriteriaStore('category');
</script>

<template>
    <template
        v-for="property in filter"
        :key="property"
    >
        <UtilityBadge
            v-if="propertyOptionForId(property)"
            :content="getTranslatedProperty(propertyOptionForId(property), 'name')"
            size="sm"
            suffix-icon="x"
            type="gray"
            :outline="true"
            class="cursor-pointer"
            @click="$emit('remove-filter', { code: 'properties', value: property })"
        />
    </template>
</template>
