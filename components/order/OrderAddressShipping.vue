<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    billingAddress: Schemas['OrderAddress'];
    shippingAddress: Schemas['OrderAddress'] | undefined;
}>();
</script>

<template>
    <template v-if="shippingAddress">
        <div>
            {{ shippingAddress?.firstName }}
            {{ shippingAddress?.lastName }}
        </div>

        <div>
            {{ shippingAddress?.street }}
        </div>

        <div>{{ shippingAddress?.zipcode }} {{ shippingAddress?.city }}</div>
    </template>

    <template v-else>
        <OrderAddressBilling :billing-address="billingAddress" />
    </template>
</template>
