<script setup lang="ts">
import type { components, Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { ListingPropertyFilter } from '~/types/listing/Filter';
import type { ChangePropertyFilter } from '~/types/listing/FilterEvents';

const props = defineProps<{
    filter: ListingPropertyFilter;
    selectedValues: Schemas['ProductListingResult']['currentFilters'];
}>();

const emits = defineEmits<{
    'filter-changed': [event: ChangePropertyFilter];
}>();

const { entityArrayToOptions } = useFormkitHelper();
const selection: Ref<string[]> = ref([]);
const optionIds = computed(() => props.filter.options?.map((option: components['schemas']['PropertyGroupOption']) => option.id));
selection.value = props.selectedValues['properties'].filter(propertyId => optionIds.value?.includes(propertyId)) ?? [];

watch(selection, (newSelection, oldSelection) => {
    const merged = [
        ...new Set(props.selectedValues['properties'].filter((id: string) => !oldSelection.includes(id)).concat(newSelection)),
    ];
    emits('filter-changed', { code: 'properties', value: merged });
});
</script>

<template>
    <div v-if="filter.options">
        <FormKit
            v-model="selection"
            type="checkbox"
            :options="entityArrayToOptions(filter.options, 'name')"
            :name="getTranslatedProperty(filter, 'name')"
            decorator-icon="check"
        />
    </div>
</template>
