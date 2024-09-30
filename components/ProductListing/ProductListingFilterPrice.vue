<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';
import type { ValueOf } from '../../types/valueof';

const { filter, selectedValues } = defineProps<{
    filter: ListingFilter<{
        max: string;
        min: string;
    }>;
    selectedValues: Schemas['ProductListingResult']['currentFilters']['price'];
}>();
defineEmits<{
    'filter-changed': [event: {
        code: 'price';
        value: ValueOf<Schemas['ProductListingResult']['currentFilters']['price']>;
    }];
}>();

const { currency } = useSessionContext();
const filterMax = computed(() => parseInt(filter.max) || 0);
const filterMin = computed(() => parseInt(filter.min) || 0);
const selectedMin = computed(() => selectedValues.min || filterMin.value || 0);
const selectedMax = computed(() => selectedValues.max || filterMax.value || 0);
const currentMin = ref(selectedMin.value);
const currentMax = ref(selectedMax.value);

const onValueChange = (value: number[]) => {
    currentMin.value = value[0];
    currentMax.value = value[1];
};
</script>

<template>
    <AccordionItem key="price" class="overflow-hidden border-b border-gray">
        <AccordionHeader class="flex">
            <AccordionTrigger class="group flex w-full cursor-pointer items-center justify-between bg-white px-5 py-3">
                <span>{{ $t('listing.sidebar.filter.price.title') }}</span>
                <FormKitIcon
                    icon="chevron-up"
                    class="ml-6 h-4 w-auto group-data-[state=open]:rotate-180"
                />
            </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent
            class="overflow-hidden px-5 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
        >
            <div class="flex justify-between pb-4 text-sm">
                <div>{{ currentMin }} {{ currency?.symbol }}</div>
                <div>{{ currentMax }} {{ currency?.symbol }}</div>
            </div>
            <SliderRoot
                class="relative flex h-5 w-full touch-none select-none items-center pb-6"
                :default-value="[selectedMin, selectedMax]"
                :max="filterMax"
                :min="filterMin"
                :step="1"
                :min-steps-between-thumbs="1"
                @update:model-value="onValueChange"
                @value-commit="
                    $emit('filter-changed', {
                        code: 'price',
                        value: {
                            min: $event[0],
                            max: $event[1],
                        }
                    })
                "
            >
                <SliderTrack class="relative h-[3px] grow rounded-full bg-gray">
                    <SliderRange class="absolute h-full rounded-full bg-brand-primary" />
                </SliderTrack>
                <SliderThumb class="block h-5 w-5 rounded-full bg-brand-primary" />
                <SliderThumb class="block h-5 w-5 rounded-full bg-brand-primary" />
            </SliderRoot>
        </AccordionContent>
    </AccordionItem>
</template>
