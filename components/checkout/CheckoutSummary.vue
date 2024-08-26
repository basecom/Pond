<script setup lang="ts">
const { totalPrice, shippingTotal, cart } = useCart();

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
        <h2 class="pb-4">Cart summary</h2>

        <CheckoutSummaryValues
            :shipping-total="shippingTotal"
            :total-price="totalPrice"
            :calculated-taxes="calculatedTaxes"
            :net-price="netPrice"
        />
    </div>
</template>
