<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    order: Schemas['Order'];
}>();
</script>

<template>
    <div class="rounded-md bg-gray-light p-4">
        <h2 class="pb-4">Order summary</h2>

        <CheckoutSummaryValues
            label="net"
            :value="order.price.netPrice"
        />

        <template
            v-for="(calculatedTax, index) in order.price.calculatedTaxes"
            :key="`calculated-tax-${index}`"
        >
            <CheckoutSummaryValues
                label="tax"
                :value="calculatedTax.tax"
            />
        </template>

        <CheckoutSummaryValues
            label="shipping"
            :value="order.shippingTotal"
        />

        <CheckoutSummaryValues
            label="total"
            :value="order.price.totalPrice"
            :highlight="true"
        />
    </div>
</template>
