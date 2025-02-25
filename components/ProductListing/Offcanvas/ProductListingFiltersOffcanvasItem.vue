<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '~/types/listing/Filter';
import { useListingStore } from '~/stores/ListingStore';

const props = withDefaults(
    defineProps<{
      filter: ListingFilter;
      selectedFilters: Schemas['ProductListingResult']['currentFilters'];
      showResetButton?: boolean;
    }>(),
    {
        showResetButton: false,
    },
);

const { t } = useI18n();
const listingStore = useListingStore('category');
const { isPropertyFilter } = useCheckType();


const name = computed(() => {
    if (isPropertyFilter(props.filter)) {
        return props.filter.name;
    }

    return t(`listing.sidebar.filter.${props.filter.code}.title`);
});

const counter = computed(() => {
    if (isPropertyFilter(props.filter)) {
        return listingStore.propertyFilterApplied(props.filter.id) ? listingStore.propertyFilterAppliedTotal(props.filter.id) : null;
    }

    return listingStore.isPriceFilterApplied() ? 1 : null;
});
</script>

<template>
    <button class="flex items-center justify-between border-b border-brand-primary py-2.5 text-start">
        <span>{{ name }}</span>

        <UtilityPill
            v-if="counter"
            :number="counter"
        />
    </button>
</template>
