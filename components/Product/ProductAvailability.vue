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
            {{ $t('product.availability.availableInfo', { deliveryTime: deliveryTime?.name }) }}
        </span>

        <span v-else-if="availableStock < minPurchase && deliveryTime && restockTime">
            {{ $t('product.availability.restockInfo', { restockTime: restockTime }) }}
            <br />
            {{ $t('product.availability.deliveryTimeInfo', { deliveryTime: deliveryTime?.name }) }}
        </span>

        <span v-else-if="availableStock < minPurchase">{{ $t('product.availability.notAvailableInfo') }}</span>
    </div>
</template>
