<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';
import type { ValueOf } from '../../types/valueof';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    filter: ListingFilter & Schemas['PropertyGroup'];
    selectedValues: Schemas['ProductListingResult']['currentFilters'];
}>();

const emits = defineEmits<{
    'filter-changed': [
        event: {
            code: 'price';
            value: ValueOf<Schemas['ProductListingResult']['currentFilters']['properties']>;
        },
    ];
}>();

// TODO selected values filter und nur die drin lassen, die auch in filter.options drin sind

const { entityArrayToOptions } = useFormkitHelper();
const selection = ref([])
const optionIds = computed(() => props.filter.options.map(option => option.id))
selection.value =
    (props.selectedValues['properties']
        .filter((propertyId) => optionIds.value.includes(propertyId)))
    ?? []

watch(selection, (newSelection, oldSelection) => {
    const merged = updateSelection(props.selectedValues['properties'], newSelection, oldSelection)
    emits('filter-changed', { code: 'properties', value: merged });
});

const updateSelection = (initial, newSelection, oldSelection) => {
    return [
        ...new Set(
            initial.filter(id => !oldSelection.includes(id)).concat(newSelection)
        ),
    ];
}
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
            <div class="px-4 py-2 border border-gray rounded flex items-center gap-2">
                {{ getTranslatedProperty(filter, 'name') }}
                <UtilityPill
                    v-if="selection.length > 0"
                    :number="selection.length"
                />
            </div>
        </PopoverTrigger>
        <PopoverContent
            side="bottom"
            :side-offset="5"
            class="w-64 rounded border border-gray-light bg-white p-4 shadow-md"
        >
            <div>
                <!-- just for debugging end -->
                <FormKit
                    v-model="selection"
                    type="checkbox"
                    :options="entityArrayToOptions(filter.options, 'name')"
                    :name="getTranslatedProperty(filter, 'name')"
                    decorator-icon="check"
                />
            </div>
        </PopoverContent>
    </PopoverRoot>
</template>
