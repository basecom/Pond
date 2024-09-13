<script setup lang="ts">
withDefaults(
    defineProps<{
        reducedDisplay?: boolean;
    }>(),
    {
        reducedDisplay: false,
    },
);
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
        <template v-if="!reducedDisplay">
            <CheckoutSummaryValues
                label="net"
                :value="netPrice"
            />

            <template
                v-for="(calculatedTax, index) in calculatedTaxes"
                :key="`calculated-tax-${index}`"
            >
                <CheckoutSummaryValues
                    label="tax"
                    :value="calculatedTax.tax"
                />
            </template>

            <CheckoutSummaryValues
                label="shipping"
                :value="shippingTotal"
            />
        </template>

        <CheckoutSummaryValues
            label="total"
            :value="totalPrice"
            :highlight="true"
        />
    </div>
</template>
