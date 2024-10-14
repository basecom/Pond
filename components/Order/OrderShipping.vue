<script setup lang="ts">
import { getShippingMethodDeliveryTime } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    shippingMethod: Schemas['ShippingMethod'];
}>();

const deliveryTime = computed(() => getShippingMethodDeliveryTime(props.shippingMethod));
</script>

<template>
    <div>
        {{ shippingMethod?.translated.name }}
    </div>

    <div v-if="deliveryTime">
        {{ deliveryTime }}
    </div>
</template>
