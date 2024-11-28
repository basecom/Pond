<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../../types/listing/filter';
import ProductListingFiltersOffcanvasItem from '~/components/ProductListing/Offcanvas/ProductListingFiltersOffcanvasItem.vue';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    filters: ListingFilter[];
    selectedFilters: Schemas['ProductListingResult']['currentFilters'];
    showResetButton?: boolean;
}>();

defineEmits<{
    'filter-changed': [key: Schemas['ProductListingResult']['currentFilters']];
}>();

const { componentsMappingOffcanvas } = useListingFiltersMapping();
const productListingCriteriaStore = useProductListingCriteriaStore('category');
const {appliedFiltersTotal} = storeToRefs(productListingCriteriaStore);

const sideMenuController = useModal();
const displayedFilter = ref(null);
</script>

<template>
    <FormKit
        type="button"
        :classes="{
            input: 'items-center'
        }"
        @click="sideMenuController.open()"
    >
        <span>
            {{ $t('listing.sidebar.title') }}
        </span>
        <UtilityPill :number="appliedFiltersTotal" />
        <FormKitIcon
            icon="filter"
            class="w-6 h-6"
        />
    </FormKit>

    <LayoutSidebar
        v-if="sideMenuController.isOpen"
        :controller="sideMenuController"
        side="bottom"
    >
        <template #header>
            <span v-if="!displayedFilter">
                {{ $t('listing.sidebar.title') }}
            </span>
            <button
                v-else
                class="flex gap-2 items-center"
                @click="displayedFilter = null"
            >
                <FormKitIcon
                    icon="chevron-left"
                    class="block w-4 h-4"
                />
                <template v-if="displayedFilter?.code === 'properties'">
                    {{ getTranslatedProperty(displayedFilter, 'name') }}
                </template>
                <template v-else>
                    {{ $t(`listing.sidebar.filter.${displayedFilter.code}.title`) }}
                </template>
            </button>
        </template>
        <template #content>
            <div class="h-full w-full overflow-hidden">
                <div
                    class="flex h-full w-full flex-row transition-transform duration-300"
                    :class="{
                        '-translate-x-full': displayedFilter,
                    }"
                >
                    <div class="flex h-full w-full shrink-0 flex-col">
                        <template
                            v-for="filter in props.filters"
                            :key="filter.code"
                        >
                            <ProductListingFiltersOffcanvasItem
                                v-if="componentsMappingOffcanvas[filter.code]"
                                :filter="filter"
                                :selected-filters="selectedFilters"
                                @click="displayedFilter = filter"
                            />
                        </template>
                    </div>
                    <div class="flex h-full w-full shrink-0 flex-col">
                        <component
                            :is="componentsMappingOffcanvas[displayedFilter?.code]"
                            :filter="displayedFilter"
                            :selected-values="props.selectedFilters"
                            @filter-changed="$emit('filter-changed', $event)"
                        />
                    </div>
                </div>
            </div>
        </template>
    </LayoutSidebar>
</template>
