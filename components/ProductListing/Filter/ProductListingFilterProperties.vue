<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../../types/listing/filter';
import type { ValueOf } from '../../../types/valueof';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import ProductListingFilterOptionsProperties from '~/components/ProductListing/Filter/Options/ProductListingFilterOptionsProperties.vue';

defineProps<{
    filter: ListingFilter & Schemas['PropertyGroup'];
    selectedValues: Schemas['ProductListingResult']['currentFilters'];
}>();

defineEmits<{
    'filter-changed': [
        event: {
            code: 'properties';
            value: ValueOf<Schemas['ProductListingResult']['currentFilters']['properties']>;
        },
    ];
}>();

const { propertyFilterApplied, propertyFilterAppliedTotal } = useProductListingCriteriaStore('category');
const popoverOpen = ref(false);
</script>

<template>
    <!-- copied shared popover, as formkit component could not be added to template#content. popover just disappeared without any error -->
    <PopoverRoot @update:open="popoverOpen = !popoverOpen">
        <PopoverTrigger
            class="none inline-flex items-center justify-center"
            :aria-label="$t('shared.popover.triggerAriaLabel')"
        >
            <div class="flex items-center gap-2 rounded border border-gray px-4 py-2">
                {{ getTranslatedProperty(filter, 'name') }}

                <UtilityPill
                    v-if="filter.code === 'properties' && propertyFilterApplied(filter.id)"
                    :number="propertyFilterAppliedTotal(filter.id)"
                />
                <FormKitIcon
                    class="block h-3 w-3 text-gray transition-all duration-150"
                    icon="chevron-down"
                    :class="{
                        'rotate-180': popoverOpen,
                    }"
                />
            </div>
        </PopoverTrigger>
        <PopoverContent
            side="bottom"
            :side-offset="5"
            class="w-64 rounded border border-gray-light bg-white p-4 shadow-md"
        >
            <ProductListingFilterOptionsProperties
                :filter="filter"
                :selected-values="selectedValues"
                @filter-changed="$emit('filter-changed', $event)"
            />
        </PopoverContent>
    </PopoverRoot>
</template>
