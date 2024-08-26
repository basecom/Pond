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
            :shipping-total="order.shippingTotal"
            :total-price="order.price.totalPrice"
            :calculated-taxes="order.price.calculatedTaxes"
            :net-price="order.price.netPrice"
        />
    </div>
</template>
