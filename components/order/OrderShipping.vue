<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    shippingMethod: Schemas['ShippingMethod'];
}>();
</script>

<template>
    <div>
        {{ shippingMethod?.translated.name }}
    </div>

    <div v-if="shippingMethod?.deliveryTime">
        {{ shippingMethod.deliveryTime?.name }}
    </div>
</template>