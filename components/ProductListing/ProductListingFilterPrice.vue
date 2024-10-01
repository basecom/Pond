<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../../types/listing/filter';
import type { ValueOf } from '../../types/valueof';

const props = defineProps<{
    filter: ListingFilter<{
        max: string;
        min: string;
    }>;
    selectedValues: Schemas['ProductListingResult']['currentFilters'];
}>();
defineEmits<{
    'filter-changed': [
        event: {
            code: 'price';
            value: ValueOf<Schemas['ProductListingResult']['currentFilters']['price']>;
        },
    ];
}>();

const { currency } = useSessionContext();
const filterMax = computed(() => parseInt(props.filter.max) || 0);
const filterMin = computed(() => parseInt(props.filter.min) || 0);
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
    <AccordionItem
        key="price"
        class="overflow-hidden border-b border-gray"
    >
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
                            min: $event[0],
                            max: $event[1],
                        },
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
