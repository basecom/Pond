<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineEmits(['onUpdate', 'onEnter']);

const props = defineProps<{
    lineItem?: Schemas['LineItem'];
    product?: Schemas['Product'];
    isLoading?: boolean;
    static?: boolean;
}>();

let quantityInformation = props.product;

if (props.lineItem) {
    quantityInformation = props.lineItem.quantityInformation;
}
</script>

<template>
    <NumberFieldRoot
        :disabled="props.isLoading || props.static"
        :locale="'de-DE'"
        :min="quantityInformation?.minPurchase ?? 1"
        :max="quantityInformation?.maxPurchase ?? quantityInformation?.availableStock ?? 100"
        :step="quantityInformation?.purchaseSteps ?? 1"
        :default-value="props.static ? props.lineItem.quantity : quantityInformation?.purchaseSteps ?? 1"
        name="quantity"
        class="flex rounded-md border border-gray-medium bg-white px-3 py-2 text-xs shadow-sm sm:text-sm"
        :class="{
            'cursor-not-allowed': props.isLoading || props.static,
        }"
        @update:model-value="$emit('onUpdate', $event)"
    >
        <NumberFieldDecrement
            v-if="!props.static"
            class="data-[disabled]:opacity-20"
        >
            <FormKitIcon
                icon="minus"
                class="block w-3"
            />
        </NumberFieldDecrement>

        <NumberFieldInput
            class="w-8 text-center focus:outline-none md:w-14"
            :class="{
                'cursor-not-allowed bg-transparent': props.isLoading || props.static,
            }"
            @keyup.enter="$emit('onEnter', $event)"
        />

        <NumberFieldIncrement
            v-if="!props.static"
            class="data-[disabled]:opacity-20"
        >
            <FormKitIcon
                icon="plus"
                class="block w-3"
            />
        </NumberFieldIncrement>
    </NumberFieldRoot>
</template>
