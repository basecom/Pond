<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';
import type { ValueOf } from '../../types/valueof';

const props = defineProps<{
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
        ...props.selectedFilters,
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
            class="flex w-full flex-col gap-2 rounded-md"
            type="multiple"
            :collapsible="true"
        >
            <template
                v-for="filter in props.filters"
                :key="filter.code"
            >
                <component
                    :is="componentsMapping[filter.code]"
                    :filter="filter"
                    :selected-values="props.selectedFilters"
                    @filter-changed="onFilterChanged"
                />
            </template>
        </AccordionRoot>
        <div
            v-if="props.showResetButton"
            class="mx-auto mb-2 mt-4"
        >
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
