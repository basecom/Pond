<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingPriceFilter } from '~/types/listing/Filter';
import type { ChangePriceFilter } from '~/types/listing/FilterEvents';

const props = defineProps<{
    filter: ListingPriceFilter;
    selectedValues: Schemas['ProductListingResult']['currentFilters'];
}>();

defineEmits<{
    'filter-changed': [event: ChangePriceFilter];
}>();

const { currency } = useSessionContext();
const filterMax = computed(() => Math.ceil(props.filter.max) || 0);
const filterMin = computed(() => Math.floor(props.filter.min) || 0);
const currentValue = ref([
    props.selectedValues.price.min || filterMin.value || 0,
    props.selectedValues.price.max || filterMax.value || 0,
]);

watch(props, () => {
    currentValue.value = [
        props.selectedValues.price.min || filterMin.value || 0,
        props.selectedValues.price.max || filterMax.value || 0,
    ];
});
</script>

<template>
    <div class="flex justify-between pb-4 text-sm">
        <div>{{ currentValue[0] }} {{ currency?.symbol }}</div>
        <div>{{ currentValue[1] }} {{ currency?.symbol }}</div>
    </div>

    <SliderRoot
        v-model:model-value="currentValue"
        class="relative flex h-5 w-full touch-none select-none items-center pb-6"
        :max="filterMax"
        :min="filterMin"
        :step="1"
        :min-steps-between-thumbs="1"
        @value-commit="
            $emit('filter-changed', {
                code: 'price',
                value: {
                    min: $event[0] ?? 0,
                    max: $event[1] ?? 0,
                },
            })
        "
    >
        <SliderTrack class="relative h-1 grow rounded-full bg-gray">
            <SliderRange class="absolute h-full rounded-full bg-brand-primary" />
        </SliderTrack>

        <SliderThumb class="block size-5 rounded-full bg-brand-primary" />
        <SliderThumb class="block size-5 rounded-full bg-brand-primary" />
    </SliderRoot>
</template>
