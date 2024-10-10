<script setup lang="ts">
import { getShippingMethodDeliveryTime } from '@shopware-pwa/helpers-next';

const { selectedShippingMethod } = useSessionContext();
</script>

<template>
    <CheckoutConfirmCard
        :title="$t('checkout.confirm.shipping.cardTitle')"
        :subtitle="$t('checkout.confirm.shipping.cardSubtitle')"
    >
        <template v-if="selectedShippingMethod">
            <CheckoutConfirmShippingMethod
                :label="selectedShippingMethod.value.translated.name"
                :deliveryTime="getShippingMethodDeliveryTime(selectedShippingMethod.value)"
                :description="selectedShippingMethod.value.translated.description"
                :mediaUrl="selectedShippingMethod.value.mediaUrl"
            />
        </template>
    </CheckoutConfirmCard>
</template>
