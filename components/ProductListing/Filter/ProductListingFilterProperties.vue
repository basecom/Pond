<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { ListingPropertyFilter } from '~/types/listing/Filter';
import { useListingStore } from '~/stores/ListingStore';
import type { ChangePropertyFilter } from '~/types/listing/FilterEvents';

defineProps<{
    filter: ListingPropertyFilter;
    selectedValues: Schemas['ProductListingResult']['currentFilters'];
}>();

defineEmits<{
    'filter-changed': [event: ChangePropertyFilter];
}>();

const listingStore = useListingStore('category');
const popoverOpen = ref(false);
</script>

<template>
    <!-- copied shared popover, as formkit component could not be added to template#content. popover just disappeared without any error -->
    <PopoverRoot @update:open="popoverOpen = !popoverOpen">
        <PopoverTrigger
            class="none inline-flex items-center justify-center"
            :aria-label="getTranslatedProperty(filter, 'name') + ' ' + $t('shared.popover.triggerAriaLabel')"
        >
            <div class="flex items-center gap-2 rounded border border-gray-medium px-4 py-2">
                {{ getTranslatedProperty(filter, 'name') }}

                <UtilityPill
                    v-if="filter.code === 'properties' && listingStore.propertyFilterApplied(filter.id)"
                    :number="listingStore.propertyFilterAppliedTotal(filter.id)"
                />
                <FormKitIcon
                    class="block size-3 text-gray transition-all duration-150"
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
            align="start"
            class="w-64 rounded border border-gray-medium bg-white p-4 shadow-lg"
        >
            <ProductListingFilterOptionsProperties
                :filter="filter"
                :selected-values="selectedValues"
                @filter-changed="(event: ChangePropertyFilter) => $emit('filter-changed', event)"
            />
        </PopoverContent>
    </PopoverRoot>
</template>
