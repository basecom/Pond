<script setup lang="ts">
import { getShippingMethodDeliveryTime, getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    method: Schemas['ShippingMethod'];
}>();
</script>

<template>
    <CheckoutConfirmCard
        :title="$t('checkout.confirm.shipping.cardTitle')"
        :subtitle="$t('checkout.confirm.shipping.cardSubtitle')"
    >
        <template v-if="method">
            <CheckoutConfirmShippingMethod
                :label="getTranslatedProperty(method, 'name')"
                :delivery-time="getShippingMethodDeliveryTime(method)"
                :description="getTranslatedProperty(method, 'description')"
                :media="method.media"
            />
        </template>
    </CheckoutConfirmCard>
</template>
