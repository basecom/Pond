<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    shippingAddress: Schemas['OrderAddress'];
    billingAddress: Schemas['OrderAddress'];
}>();
</script>

<template>
    <CheckoutConfirmCard :title="$t('checkout.confirm.address.shipping')">
        <AddressData :address="shippingAddress" />
    </CheckoutConfirmCard>

    <CheckoutConfirmCard :title="$t('checkout.confirm.address.billing')">
        <AddressData v-if="shippingAddress.id !== billingAddress.id" :address="billingAddress" />
        <p v-else>{{ $t('checkout.confirm.address.sameAsShippingAddress') }}</p>
    </CheckoutConfirmCard>
</template>
