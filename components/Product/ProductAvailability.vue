<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    product: Schemas['Product'] | Schemas['LineItem'];
}>();

const availableStock = computed(() => {
    if ('availableStock' in props.product) {
        return props.product.availableStock ?? 0;
    }

    if ('deliveryInformation' in props.product) {
        return props.product.deliveryInformation.stock ?? 0;
    }

    return 0;
});

const minPurchase = computed(() => {
    if ('minPurchase' in props.product) {
        return props.product.minPurchase ?? 0;
    }

    if ('quantityInformation' in props.product) {
        return props.product.quantityInformation?.minPurchase ?? 0;
    }

    return 0;
});

const deliveryTime = computed(() => {
    if ('deliveryTime' in props.product) {
        return props.product.deliveryTime;
    }

    if ('deliveryInformation' in props.product) {
        return props.product.deliveryInformation?.deliveryTime;
    }

    return null;
});

const restockTime = computed(() => {
    if ('restockTime' in props.product) {
        return props.product.restockTime;
    }

    if ('deliveryInformation' in props.product) {
        return props.product.deliveryInformation?.restockTime;
    }

    return null;
});
</script>

<template>
    <div class="w-full text-sm">
        <span v-if="availableStock >= minPurchase && deliveryTime">
            {{ $t('product.availability.available', { deliveryTime: deliveryTime?.name }) }}
        </span>

        <span v-else-if="availableStock < minPurchase && deliveryTime && restockTime">
            {{ $t('product.availability.restock', { restockTime: restockTime }) }}
            <br>
            {{ $t('product.availability.deliveryTime', { deliveryTime: deliveryTime?.name }) }}
        </span>

        <span v-else-if="availableStock < minPurchase">
            {{ $t('product.availability.notAvailable') }}
        </span>
    </div>
</template>
