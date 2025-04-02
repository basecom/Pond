<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { breakpointsTailwind } from '@vueuse/core';
import type { ListingFilter } from '~/types/listing/Filter';
import type { ChangePriceFilter, ChangePropertyFilter, RemoveFilterEvent } from '~/types/listing/FilterEvents';

const props = withDefaults(
    defineProps<{
        filters: ListingFilter[];
        selectedFilters: Schemas['ProductListingResult']['currentFilters']|null;
        showResetButton?: boolean;
        productListingStoreKey?: string;
    }>(),
    {
        showResetButton: true,
        productListingStoreKey: 'category',
    },
);

const emits = defineEmits<{
    'filter-changed': [key: Schemas['ProductListingResult']['currentFilters']];
    'reset-filters': [];
    'remove-filter': [event: RemoveFilterEvent];
}>();

const filterPopoverContainer = ref(null);
const expandPopoverContainerButton = ref(null);
const displayFullPopoverContainer = ref(false);

const { componentsMapping, componentsMappingBadge } = useListingFiltersMapping();
const breakpoints = useBreakpoints(breakpointsTailwind);

const onFilterChanged = (event: ChangePriceFilter | ChangePropertyFilter) => {
    const newFilters = {
        ...props.selectedFilters,
        [event.code]: event.value,
    } as Schemas['ProductListingResult']['currentFilters'];

    emits('filter-changed', newFilters);
};

const isDesktop = computed(() => breakpoints.greater('md'));

const { height: containerHeight } = useElementBounding(filterPopoverContainer);

const containerMultipleLined = computed(() => containerHeight.value > 42);
</script>

<template>
    <div
        v-if="isDesktop.value && filters.length"
        class="flex flex-col gap-4"
    >
        <div
            class="h-11 overflow-hidden transition-all duration-300"
            :class="{
                'h-full': displayFullPopoverContainer,
            }"
        >
            <div class="relative z-10 flex flex-col gap-2">
                <div
                    ref="filterPopoverContainer"
                    class="flex flex-row flex-wrap gap-2"
                >
                    <template
                        v-for="filter in props.filters"
                        :key="filter.code"
                    >
                        <component
                            :is="componentsMapping[filter.code]"
                            :filter="filter"
                            :selected-values="props.selectedFilters"
                            :product-listing-store-key="productListingStoreKey"
                            @filter-changed="onFilterChanged"
                        />
                    </template>
                </div>

                <button
                    v-if="containerMultipleLined"
                    ref="expandPopoverContainerButton"
                    class="flex h-fit items-center gap-2 whitespace-nowrap rounded border border-gray px-4 py-2"
                    @click="() => (displayFullPopoverContainer = !displayFullPopoverContainer)"
                >
                    <template v-if="displayFullPopoverContainer">
                        <span>
                            {{ $t('listing.sidebar.filter.showLess') }}
                        </span>

                        <FormKitIcon
                            icon="minus"
                            class="size-3"
                        />
                    </template>

                    <template v-else>
                        <span>
                            {{ $t('listing.sidebar.filter.showMore') }}
                        </span>

                        <FormKitIcon
                            icon="plus"
                            class="size-3"
                        />
                    </template>
                </button>
            </div>
        </div>

        <div v-if="selectedFilters" class="mb-4 flex flex-wrap gap-3">
            <template
                v-for="(filter, key) in selectedFilters"
                :key="key"
            >
                <component
                    :is="componentsMappingBadge[key]"
                    :filter="filter"
                    :product-listing-store-key="productListingStoreKey"
                    @remove-filter="(event: RemoveFilterEvent) => $emit('remove-filter', event)"
                />
            </template>

            <UtilityBadge
                v-if="props.showResetButton"
                :content="$t('listing.sidebar.filter.reset')"
                size="md"
                type="danger"
                suffix-icon="x"
                class="cursor-pointer"
                @click="$emit('reset-filters')"
            />
        </div>
    </div>

    <ProductListingOffcanvasFilter
        v-else
        :filters="filters"
        :selected-filters="selectedFilters"
        :product-listing-store-key="productListingStoreKey"
        @filter-changed="onFilterChanged"
    />
</template>
