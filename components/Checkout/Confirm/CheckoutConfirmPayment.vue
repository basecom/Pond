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
        >
            <template #label="{ option }">
                <div>
                    <span>
                        {{ option.label }}
                    </span>

                    <span
                        v-if="option.description"
                        class="block text-sm italic"
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
