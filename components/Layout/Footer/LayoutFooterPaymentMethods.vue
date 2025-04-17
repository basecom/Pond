<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

// We can't use the useCheckout composable to get the paymentMethods because it always uses the parameter 'onlyAvailable'
// This means that it applies rules from e.g. the rule builder depending on the current context
// We want to show ALL possible payment methods here though, not just the ones currently available for the customer / cart
const { apiClient } = useShopwareContext();
const { data: paymentMethods } = await apiClient.invoke(
    'readPaymentMethod post /payment-method',
    {
        body: { onlyAvailable: false },
    },
);

const paymentMethodsWithMedia = computed(() => paymentMethods.elements.filter((method: Schemas['PaymentMethod']) => method.media?.path));
</script>

<template>
    <div class="flex justify-center py-2">
        <div class="flex flex-wrap justify-center gap-6">
            <div
                v-for="method in paymentMethodsWithMedia"
                :key="method.id"
                class="flex items-center justify-center"
            >
                <img
                    v-if="method.media?.url"
                    :src="method.media.url"
                    :alt="getTranslatedProperty(method.media, 'alt') || getTranslatedProperty(method, 'name')"
                    :title="getTranslatedProperty(method.media, 'title') || getTranslatedProperty(method, 'name')"
                    class="h-8 w-auto object-contain"
                    loading="lazy"
                >
            </div>
        </div>
    </div>
</template>
