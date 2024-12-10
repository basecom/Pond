<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    filter: ListingFilter & Schemas['PropertyGroup'];
    selectedValues: Schemas['ProductListingResult']['currentFilters'];
}>();

const emits = defineEmits<{
    'filter-changed': [
        event: {
            code: 'properties';
            value: ValueOf<Schemas['ProductListingResult']['currentFilters']['properties']>;
        },
    ];
}>();

const { entityArrayToOptions } = useFormkitHelper();
const selection = ref([]);
const optionIds = computed(() => props.filter.options.map(option => option.id));
selection.value = props.selectedValues['properties'].filter(propertyId => optionIds.value.includes(propertyId)) ?? [];

watch(selection, (newSelection, oldSelection) => {
    const merged = updateSelection(props.selectedValues['properties'], newSelection, oldSelection);
    emits('filter-changed', { code: 'properties', value: merged });
});

const updateSelection = (initial, newSelection, oldSelection) => {
    return [...new Set(initial.filter(id => !oldSelection.includes(id)).concat(newSelection))];
};
</script>

<template>
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
</template>
