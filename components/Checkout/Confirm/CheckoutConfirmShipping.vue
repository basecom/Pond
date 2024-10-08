<script setup lang="ts">
import { getShippingMethodDeliveryTime } from '@shopware-pwa/helpers-next';

const { shippingMethods, getShippingMethods } = useCheckout();
const { trackAddShippingInfo } = useAnalytics();

const { selectedShippingMethod: shippingMethod, setShippingMethod } = useSessionContext();

const selectedShippingMethod = computed({
    get(): string {
        return shippingMethod.value?.id || '';
    },
    async set(shippingMethodId: string) {
        await setShippingMethod({ id: shippingMethodId });
        trackAddShippingInfo();
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
                <div>
                    <span>
                        {{ option.label }}
                    </span>

                    <span v-if="option.deliveryTime"> ({{ option.deliveryTime }}) </span>

                    <span
                        v-if="option.description"
                        class="text-secondary-500 block text-sm italic"
                    >
                        {{ option.description }}
                    </span>

                    <img
                        v-if="option.mediaUrl"
                        loading="lazy"
                        :src="option.mediaUrl"
                        :alt="`Logo of ${option.label}`"
                    />
                </div>
            </template>
        </FormKit>
    </CheckoutConfirmCard>
</template>
