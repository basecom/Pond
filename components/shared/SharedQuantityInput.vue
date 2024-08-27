<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineEmits(['onUpdate', 'onEnter']);

const props = defineProps<{
    lineItem?: Schemas['LineItem'];
    product?: Schemas['Product'];
    isLoading?: boolean;
}>();

let quantityInformation = props.product;

if (props.lineItem) {
    quantityInformation = props.lineItem.quantityInformation;
}
</script>

<template>
    <NumberFieldRoot
        :disabled="props.isLoading"
        :locale="'de-DE'"
        :min="quantityInformation?.minPurchase ?? 1"
        :max="quantityInformation?.maxPurchase ?? quantityInformation?.availableStock ?? 100"
        :step="quantityInformation?.purchaseSteps ?? 1"
        :default-value="quantityInformation?.minPurchase ?? 1"
        name="quantity"
        class="flex rounded-md border border-gray-medium bg-white px-3 py-2 shadow-sm sm:text-sm"
        @update:model-value="$emit('onUpdate', $event)"
    >
        <NumberFieldDecrement class="data-[disabled]:opacity-20">
            <FormKitIcon
                icon="minus"
                class="block w-3"
            />
        </NumberFieldDecrement>

        <NumberFieldInput
            class="w-14 text-center focus:outline-none"
            @keyup.enter="$emit('onEnter', $event)"
        />

        <NumberFieldIncrement class="data-[disabled]:opacity-20">
            <FormKitIcon
                icon="plus"
                class="block w-3"
            />
        </NumberFieldIncrement>
    </NumberFieldRoot>
</template>
