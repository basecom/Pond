<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    cart: Schemas['Cart'];
}>();

const dateFormat = 'DD.MM.YYYY';

const earliestDeliveryDate = computed(() => {
    const earliestDeliveryDate = useDateFormat(props.cart.deliveries[0]?.deliveryDate?.earliest, dateFormat, {
        locales: (typeof navigator !== 'undefined' && navigator.language) || 'en-US',
    });

    return earliestDeliveryDate || undefined;
});

const latestDeliveryDate = computed(() => {
    const latestDeliveryDate = useDateFormat(props.cart.deliveries[0]?.deliveryDate?.latest, dateFormat, {
        locales: (typeof navigator !== 'undefined' && navigator.language) || 'en-US',
    });

    return latestDeliveryDate || undefined;
});
</script>

<template>
    <div v-if="earliestDeliveryDate && latestDeliveryDate">
        Order delivery period: {{ earliestDeliveryDate }} - {{ latestDeliveryDate }}
    </div>
</template>