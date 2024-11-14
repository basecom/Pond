<script setup lang="ts">
const { paymentMethods, getPaymentMethods } = useCheckout();

const { selectedPaymentMethod: paymentMethod, setPaymentMethod } = useSessionContext();
const { trackAddPaymentInfo } = useAnalytics();

const selectedPaymentMethod = computed({
    get(): string {
        return paymentMethod.value?.id || '';
    },
    async set(paymentMethodId: string) {
        await setPaymentMethod({ id: paymentMethodId });
        trackAddPaymentInfo();
    },
});

const paymentOptions = ref([]);

onMounted(async () => {
    await getPaymentMethods();

    paymentOptions.value = paymentMethods.value.map(method => ({
        label: method.translated.name,
        value: method.id,
        description: method.translated.description,
        mediaUrl: method.media?.url,
    }));
    trackAddPaymentInfo();
});
</script>

<template>
    <CheckoutConfirmCard
        :title="$t('checkout.confirm.payment.cardTitle')"
        :subtitle="$t('checkout.confirm.payment.cardSubtitle')"
    >
        <FormKit
            v-if="paymentOptions.length > 0"
            v-model="selectedPaymentMethod"
            type="radio"
            name="paymentOption"
            :options="paymentOptions"
            fieldset-class="w-full"
            wrapper-class="w-full !mb-5 !items-start"
            decorator-class="mt-1"
        >
            <template #label="{ option }">
                <CheckoutConfirmPaymentMethod
                    :label="option.label"
                    :description="option.description"
                    :media-url="option.mediaUrl"
                />
            </template>
        </FormKit>
    </CheckoutConfirmCard>
</template>
