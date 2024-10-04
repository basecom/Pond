<script setup lang="ts">
const { paymentMethods, getPaymentMethods } = useCheckout();

const { selectedPaymentMethod: paymentMethod, setPaymentMethod } = useSessionContext();

const selectedPaymentMethod = computed({
    get(): string {
        return paymentMethod.value?.id || '';
    },
    async set(paymentMethodId: string) {
        await setPaymentMethod({ id: paymentMethodId });
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
            :options="paymentOptions"
            fieldset-class="w-full"
            wrapper-class="w-full !mb-5 !items-start"
            decorator-class="mt-1"
        >
            <template #label="{ option }">
                <div class="ml-1">
                    <span>
                        {{ option.label }}
                    </span>
                    <span
                        v-if="option.description"
                        class="text-secondary-500 block text-sm"
                    >
                        {{ option.description }}
                    </span>
                </div>
                <img
                    v-if="option.mediaUrl"
                    loading="lazy"
                    :src="option.mediaUrl"
                    :alt="`Logo of ${option.label}`"
                    class="ml-auto max-h-6 max-w-full object-contain"
                />
            </template>
        </FormKit>
    </CheckoutConfirmCard>
</template>
