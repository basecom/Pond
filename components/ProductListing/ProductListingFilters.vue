<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { breakpointsTailwind } from '@vueuse/core';

const props = defineProps<{
    filters: ListingFilter[];
    selectedFilters: Schemas['ProductListingResult']['currentFilters'];
    showResetButton?: boolean;
}>();

const emit = defineEmits<{
    'filter-changed': [key: Schemas['ProductListingResult']['currentFilters']];
    'reset-filters': [];
    'reset-filter': [key: string];
    'remove-filter': [
        event: {
            code: 'properties';
            value: ValueOf<Schemas['PropertyGroupOption']['id'] | null>;
        },
    ];
}>();

const filterPopoverContainer = ref(null);
const expandPopoverContainerButton = ref(null);
const displayFullPopoverContainer = ref(false);

const { componentsMapping, componentsMappingBadge } = useListingFiltersMapping();
const breakpoints = useBreakpoints(breakpointsTailwind);

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
            <div class="relative z-10 flex flex-row gap-2">
                <div
                    ref="filterPopoverContainer"
                    class="flex flex-row flex-wrap gap-4"
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
                            class="h-3 w-3"
                        />
                    </template>
                    <template v-else>
                        <span>
                            {{ $t('listing.sidebar.filter.showMore') }}
                        </span>

                        <FormKitIcon
                            icon="plus"
                            class="h-3 w-3"
                        />
                    </template>
                </button>
            </div>
        </div>

        <div
            v-if="props.showResetButton"
            class="mx-auto w-full"
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

        <div class="flex flex-wrap gap-3">
            <template
                v-for="(filter, key) in selectedFilters"
                :key="key"
            >
                <component
                    :is="componentsMappingBadge[key]"
                    :filter="filter"
                    @reset-filter="$event => $emit('reset-filter', $event)"
                    @remove-filter="$event => $emit('remove-filter', $event)"
                />
            </template>
        </div>
    </div>

    <ProductListingFiltersOffcanvas
        v-else
        :filters="filters"
        :selected-filters="selectedFilters"
        @filter-changed="onFilterChanged"
    />
</template>
