<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    netPrice: number;
    calculatedTaxes: Schemas['CalculatedTaxes'];
    shippingTotal: number;
    totalPrice: number;
}>();

const { getFormattedPrice } = usePrice();
</script>

<template>
    <div class="flex justify-between border-b border-gray py-4 text-sm">
        <p class="text-gray-dark">Net Total</p>
        <span>{{ getFormattedPrice(netPrice) }}</span>
    </div>

    <div
        v-for="calculatedTax in calculatedTaxes"
        :key="calculatedTax"
        class="flex justify-between border-b border-gray py-4 text-sm"
    >
        <p class="text-gray-dark">plus Tax</p>
        <span>{{ getFormattedPrice(calculatedTax.tax) }}</span>
    </div>

    <div class="flex justify-between border-b border-gray py-4 text-sm">
        <p class="text-gray-dark">Shipping</p>
        <span>{{ getFormattedPrice(shippingTotal) }}</span>
    </div>

    <div class="flex justify-between py-4 font-bold">
        <p>Total</p>
        <span>{{ getFormattedPrice(totalPrice) }}</span>
    </div>
</template>
