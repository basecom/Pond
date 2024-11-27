<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../../types/listing/filter';
import ProductListingFiltersOffcanvasItem from '~/components/ProductListing/Offcanvas/ProductListingFiltersOffcanvasItem.vue';

const props = defineProps<{
    filters: ListingFilter[];
    selectedFilters: Schemas['ProductListingResult']['currentFilters'];
    showResetButton?: boolean;
}>();

defineEmits<{
    'filter-changed': [key: Schemas['ProductListingResult']['currentFilters']];
}>();

const { componentsMappingOffcanvas } = useListingFiltersMapping();

const sideMenuController = useModal();
const displayedFilter = ref(null);
</script>

<template>
    <div @click="sideMenuController.open()">filter - bottom</div>

    <LayoutSidebar
        v-if="sideMenuController.isOpen"
        :controller="sideMenuController"
        side="bottom"
    >
        <template #header> Filter </template>
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
                        <div @click="displayedFilter = null">back</div>
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
