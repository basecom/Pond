<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    product: Schemas['Product, LineItem'];
}>();

const availableStock = props.product.availableStock ?? props.product.deliveryInformation.stock ?? 0;
const minPurchase = props.product.minPurchase ?? props.product.quantityInformation.minPurchase ?? 0;
const deliveryTime = props.product.deliveryTime ?? props.product.deliveryInformation.deliveryTime;
const restockTime = props.product.restockTime ?? props.product.deliveryInformation.restockTime;
</script>

<template>
    <div class="w-full text-sm">
        <span v-if="availableStock >= minPurchase && deliveryTime">
            Available, delivery time {{ deliveryTime?.name }}
        </span>

        <span v-else-if="availableStock < minPurchase && deliveryTime && restockTime">
            Available, restock time of {{ restockTime }} days
            <br>
            delivery time {{ deliveryTime?.name }}
        </span>

        <span v-else-if="availableStock < minPurchase">
            Currently not available
        </span>
    </div>
</template>