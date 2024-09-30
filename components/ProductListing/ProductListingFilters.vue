<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';
import type { ValueOf } from '../../types/valueof';

const { filters, selectedFilters } = defineProps<{
    filters: ListingFilter[];
    selectedFilters: Schemas['ProductListingResult']['currentFilters'];
    showResetButton?: boolean;
}>();
const emit = defineEmits<{
    'filter-changed': [key: Schemas['ProductListingResult']['currentFilters']];
    'reset-filters': [];
}>();

const { componentsMapping } = useListingFiltersMapping();

const onFilterChanged = ({
    code,
    value,
}: {
    code: keyof Schemas['ProductListingResult']['currentFilters'];
    value: ValueOf<Schemas['ProductListingResult']['currentFilters']>;
}) => {
    const newFilters = {
        ...selectedFilters,
        [code]: value,
    };

    emit('filter-changed', newFilters);
};
</script>

<template>
    <div
        v-if="filters.length"
        class="flex flex-col"
    >
        <AccordionRoot
            class="w-full rounded-md flex flex-col gap-2"
            type="multiple"
            :collapsible="true"
        >
            <template
                v-for="filter in filters"
                :key="filter.code"
            >
                <component
                    :is="componentsMapping[filter.code]"
                    :filter="filter"
                    :selected-values="selectedFilters[filter.code]"
                    @filter-changed="onFilterChanged"
                />
            </template>
        </AccordionRoot>
        <div v-if="showResetButton" class="mx-auto mt-4 mb-2">
            <FormKit
                type="button"
                suffix-icon="xmark"
                :ignore="true"
                @click="emit('reset-filters')"
            >
                {{ $t('listing.sidebar.filter.reset') }}
            </FormKit>
        </div>
    </div>
</template>

<style scoped></style>
