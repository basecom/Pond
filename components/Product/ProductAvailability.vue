<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    product: Schemas['Product'] | Schemas['LineItem'];
}>();

const availableStock = computed(() => (props.product as Schemas['Product'])?.availableStock ?? (props.product as Schemas['LineItem'])?.deliveryInformation?.stock ?? 0);
const minPurchase = computed(() => (props.product as Schemas['Product'])?.minPurchase ?? (props.product as Schemas['LineItem'])?.quantityInformation?.minPurchase ?? 0);
const restockTime = computed(() => (props.product as Schemas['Product'])?.restockTime ?? (props.product as Schemas['LineItem'])?.deliveryInformation?.restockTime ?? null);
const deliveryTime = computed(() => (props.product as Schemas['Product'])?.deliveryTime ?? (props.product as Schemas['LineItem'])?.deliveryInformation?.deliveryTime ?? null);
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
