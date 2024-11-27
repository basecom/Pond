<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';
import type { ValueOf } from '../../types/valueof';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import ProductListingFilterOptionsProperties from '~/components/ProductListing/FilterOptions/ProductListingFilterOptionsProperties.vue';

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

// TODO X anzahl der selecteted filter options dieses Filters anzeigen lassen, idealerweise durch helper function ausm store
// TODO X resetten der property filter
// TODO anzeige der aktuellen filter als badges incl löschen
// TODO löschen der Filter über badges
// TODO X Badge am preis filter wenn selected
// TODO arrow am Desktop trigger der rotated beim öffnen
</script>

<template>
    <!--    <SharedPopover :with-close-button="false">-->
    <!--        <template #trigger>-->
    <!--            <div class="px-4 py-2 border border-gray rounded">-->
    <!--                {{ getTranslatedProperty(filter, 'name') }}-->
    <!--            </div>-->
    <!--        </template>-->

    <!--        <template #content>-->

    <!--            <FormKit-->
    <!--                type="checkbox"-->
    <!--                :label="$t('account.register.terms.label')"-->
    <!--                :help="$t('account.register.terms.help')"-->
    <!--                name="terms"-->
    <!--                decorator-icon="check"-->
    <!--            />-->
    <!--        </template>-->
    <!--    </SharedPopover>-->
    <!-- copied shared popover, as formkit component could not be added to template#content. popover just disappeared without any error -->
    <PopoverRoot>
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
