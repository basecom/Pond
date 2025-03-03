<script setup lang="ts">
import { getShippingMethodDeliveryTime } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';
import type { ShippingMethodOption } from '~/types/checkout/ShippingMethodOption';

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

const shippingOptions: Ref<ShippingMethodOption[]|null> = ref(null);

onMounted(async () => {
    await getShippingMethods();

    shippingOptions.value = shippingMethods.value.map((method: Schemas['ShippingMethod']) => ({
        label: method.translated.name,
        value: method.id,
        deliveryTime: getShippingMethodDeliveryTime(method),
        description: method.translated.description,
        media: method.media,
    } as ShippingMethodOption));

    trackAddShippingInfo();
});
</script>

<template>
    <CheckoutConfirmCard
        :title="$t('checkout.confirm.shipping.cardTitle')"
        :subtitle="$t('checkout.confirm.shipping.cardSubtitle')"
    >
        <FormKit
            v-if="shippingOptions?.length"
            v-model="selectedShippingMethod"
            type="radio"
            name="shippingMethod"
            :options="shippingOptions"
        >
            <template #label="{ option }">
                <CheckoutConfirmShippingMethod
                    :label="option.label"
                    :delivery-time="option.deliveryTime"
                    :description="option.description"
                    :media="option.media"
                />
            </template>
        </FormKit>
    </CheckoutConfirmCard>
</template>
