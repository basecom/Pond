<script setup lang="ts">
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
    <div class="rounded-md bg-gray-light p-4">
        <h2 class="pb-4">Order summary</h2>

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
    </div>
</template>
