<script setup lang="ts">
import { computed } from "vue";

const { totalPrice, shippingTotal, cart } = useCart();
const { getFormattedPrice } = usePrice();

const netPrice = computed(() => {
    const netPrice = cart.value?.price?.netPrice;
    return netPrice || 0;
});

const calculatedTaxes = computed(() => {
    const calculatedTaxes = cart.value?.price?.calculatedTaxes;
    return calculatedTaxes || [];
});
</script>

<template>
    <div
        class="p-4 bg-gray-light rounded-md"
    >
        <h2 class="font-medium pb-4">
            Order summary
        </h2>

        <div
            class="flex py-4 border-b border-gray justify-between text-sm"
        >
            <p class="text-gray-dark">Net Total</p>
            <span>{{ getFormattedPrice(netPrice) }}</span>
        </div>

        <div
            class="flex py-4 border-b border-gray justify-between text-sm" v-for="calculatedTax in calculatedTaxes"
        >
            <p class="text-gray-dark">plus Tax</p>
            <span>{{ getFormattedPrice(calculatedTax.tax) }}</span>
        </div>

        <div
            class="flex py-4 border-b border-gray justify-between text-sm"
        >
            <p class="text-gray-dark">Shipping</p>
            <span>{{ getFormattedPrice(shippingTotal) }}</span>
        </div>

        <div
            class="flex py-4 justify-between font-bold"
        >
            <p>Total</p>
            <span>{{ getFormattedPrice(totalPrice) }}</span>
        </div>
    </div>
</template>
