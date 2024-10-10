<script setup lang="ts">
import { getShippingMethodDeliveryTime } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    method: Schemas['ShippingMethod'];
}>()
</script>

<template>
    <CheckoutConfirmCard
        :title="$t('checkout.confirm.shipping.cardTitle')"
        :subtitle="$t('checkout.confirm.shipping.cardSubtitle')"
    >
        <template v-if="method">
            <CheckoutConfirmShippingMethod
                :label="method.translated.name"
                :deliveryTime="getShippingMethodDeliveryTime(method)"
                :description="method.translated.description"
                :mediaUrl="method.media?.url"
            />
        </template>
    </CheckoutConfirmCard>
</template>
