<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';
import type { ValueOf } from '../../types/valueof';
defineProps<{
    filter: ListingFilter<{
        max: string;
        min: string;
    }>;
    selectedValues: Schemas['ProductListingResult']['currentFilters'];
}>();

defineEmits<{
    'filter-changed': [
        event: {
            code: 'price';
            value: ValueOf<Schemas['ProductListingResult']['currentFilters']['price']>;
        },
    ];
}>();
const { priceFilterApplied } = useProductListingCriteriaStore('category');
</script>

<template>
    <SharedPopover :with-close-button="false">
        <template #trigger>
            <div class="flex items-center gap-2 rounded border border-gray px-4 py-2">
                {{ $t('listing.sidebar.filter.price.title') }}
                <UtilityPill
                    v-if="filter.code === 'price' && priceFilterApplied()"
                    number="1"
                />
            </div>
        </template>
        <template #content>
            <ProductListingFilterOptionsPrice
                :filter="filter"
                :selected-values="selectedValues"
                @filter-changed="$emit('filter-changed', $event)"
            />
        </template>
    </SharedPopover>
</template>
