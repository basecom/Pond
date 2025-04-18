<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useListingStore } from '~/stores/ListingStore';
import type { ListingPriceFilter } from '~/types/listing/Filter';
import type { ChangePriceFilter } from '~/types/listing/FilterEvents';

const props = withDefaults(
    defineProps<{
        filter: ListingPriceFilter;
        selectedValues: Schemas['ProductListingResult']['currentFilters'];
        productListingStoreKey?: string;
    }>(),
    {
        productListingStoreKey: 'category',
    },
);

defineEmits<{
    'filter-changed': [event: ChangePriceFilter];
}>();

const listingStore = useListingStore(props.productListingStoreKey);
const popoverOpen = ref(false);
const { t } = useI18n();
</script>

<template>
    <!-- copied shared popover, as formkit component could not be added to template#content. popover just disappeared without any error -->
    <PopoverRoot @update:open="popoverOpen = !popoverOpen">
        <PopoverTrigger
            class="none inline-flex items-center justify-center"
            :aria-label="$t('listing.sidebar.filter.price.title') + ' ' + $t('shared.popover.triggerAriaLabel')"
        >
            <div class="flex items-center gap-2 rounded border border-gray-medium px-4 py-2">
                {{ $t('listing.sidebar.filter.price.title') }}
                <UtilityPill
                    v-if="filter.code === 'price' && listingStore.isPriceFilterApplied()"
                    :number="1"
                />
                <FormKitIcon
                    class="block size-3 text-gray transition-all duration-150"
                    :class="{
                        'rotate-180': popoverOpen,
                    }"
                    icon="chevron-down"
                    :title="t('icon.priceFilter')"
                />
            </div>
        </PopoverTrigger>
        <PopoverContent
            side="bottom"
            :side-offset="5"
            align="start"
            class="w-64 rounded border border-gray-medium bg-white p-4 shadow-lg"
        >
            <ProductListingFilterOptionsPrice
                :filter="filter"
                :selected-values="selectedValues"
                @filter-changed="$emit('filter-changed', $event)"
            />
        </PopoverContent>
    </PopoverRoot>
</template>
