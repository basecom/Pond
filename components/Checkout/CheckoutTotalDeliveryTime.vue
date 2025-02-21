<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    cart: Schemas['Cart'];
}>();

const dateFormat = 'DD.MM.YYYY';

const earliestDeliveryDate = computed(
    () =>
        useDateFormat(props.cart.deliveries?.[0]?.deliveryDate?.earliest, dateFormat, {
            locales: (typeof navigator !== 'undefined' && navigator.language) || 'en-US',
        }) || undefined,
);

const latestDeliveryDate = computed(
    () =>
        useDateFormat(props.cart.deliveries?.[0]?.deliveryDate?.latest, dateFormat, {
            locales: (typeof navigator !== 'undefined' && navigator.language) || 'en-US',
        }) || undefined,
);
</script>

<template>
    <div v-if="earliestDeliveryDate && latestDeliveryDate">
        {{ $t('order.deliveryPeriod') }} {{ earliestDeliveryDate }} - {{ latestDeliveryDate }}
    </div>
</template>
