<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    order: Schemas['Order'];
}>();
</script>

<template>
    <div class="rounded-md bg-gray-light p-4">
        <h2 class="pb-4">{{ $t('order.summary.heading') }}</h2>

        <CheckoutSummaryValues
            :label="$t('order.summary.netPriceLabel')"
            :value="order.price.netPrice"
        />

        <template
            v-for="(calculatedTax, index) in order.price.calculatedTaxes"
            :key="`calculated-tax-${index}`"
        >
            <CheckoutSummaryValues
                :label="$t('order.summary.taxLabel')"
                :value="calculatedTax.tax"
            />
        </template>

        <CheckoutSummaryValues
            :label="$t('order.summary.shippingCostLabel')"
            :value="order.shippingTotal"
        />

        <CheckoutSummaryValues
            :label="$t('order.summary.totalLabel')"
            :value="order.price.totalPrice"
            :highlight="true"
        />
    </div>
</template>
