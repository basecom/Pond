<script setup lang="ts">
withDefaults(
    defineProps<{
        reducedDisplay?: boolean;
    }>(),
    {
        reducedDisplay: false,
    },
);

const { preselectShippingMethodFallback } = useShippingMethod();
await preselectShippingMethodFallback();

const { totalPrice, shippingTotal, cart } = useCart();

const netPrice = computed(() => cart.value?.price?.netPrice || 0);
const calculatedTaxes = computed(() => cart.value?.price?.calculatedTaxes || []);
</script>

<template>
    <div class="rounded-md bg-gray-light p-4">
        <h2 class="pb-4">{{ $t('checkout.summary.heading') }}</h2>
        <template v-if="!reducedDisplay">
            <CheckoutSummaryValues
                :label="$t('checkout.summary.netPriceLabel')"
                :value="netPrice"
            />

            <template
                v-for="(calculatedTax, index) in calculatedTaxes"
                :key="`calculated-tax-${index}`"
            >
                <CheckoutSummaryValues
                    :label="$t('checkout.summary.taxLabel')"
                    :value="calculatedTax.tax"
                />
            </template>

            <CheckoutSummaryValues
                :label="$t('checkout.summary.shippingCostLabel')"
                :value="shippingTotal"
            />
        </template>

        <CheckoutSummaryValues
            :label="$t('checkout.summary.totalLabel')"
            :value="totalPrice"
            :highlight="true"
        />
    </div>

    <CheckoutTotalDeliveryTime :cart="cart" />
</template>
