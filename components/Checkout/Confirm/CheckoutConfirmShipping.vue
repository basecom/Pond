<script setup lang="ts">
import { getShippingMethodDeliveryTime } from '@shopware-pwa/helpers-next';

const { shippingMethods, getShippingMethods } = useCheckout();
const { trackAddShippingInfo } = useAnalytics();
const { refreshCart } = useCart();

const { selectedShippingMethod: shippingMethod, setShippingMethod } = useSessionContext();

const selectedShippingMethod = computed({
    get(): string {
        return shippingMethod.value?.id || '';
    },
    async set(shippingMethodId: string) {
        await setShippingMethod({ id: shippingMethodId });
        trackAddShippingInfo();
        await refreshCart();
    },
});

const shippingOptions = ref([]);

onMounted(async () => {
    await getShippingMethods();

    shippingOptions.value = shippingMethods.value.map(method => ({
        label: method.translated.name,
        value: method.id,
        deliveryTime: getShippingMethodDeliveryTime(method),
        description: method.translated.description,
        mediaUrl: method.media?.url,
    }));

    trackAddShippingInfo();
});
</script>

<template>
    <CheckoutConfirmCard
        :title="$t('checkout.confirm.shipping.cardTitle')"
        :subtitle="$t('checkout.confirm.shipping.cardSubtitle')"
    >
        <FormKit
            v-if="shippingOptions.length > 0"
            v-model="selectedShippingMethod"
            type="radio"
            :options="shippingOptions"
        >
            <template #label="{ option }">
                <CheckoutConfirmShippingMethod
                    :label="option.label"
                    :delivery-time="option.deliveryTime"
                    :description="option.description"
                    :media-url="option.mediaUrl"
                />
            </template>
        </FormKit>
    </CheckoutConfirmCard>
</template>
