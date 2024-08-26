<script setup lang="ts">
const {
    paymentMethods,
    getPaymentMethods,
} = useCheckout();

const {
    selectedPaymentMethod: paymentMethod,
    setPaymentMethod,
} = useSessionContext();

const selectedPaymentMethod = computed({
    get(): string {
        return paymentMethod.value?.id || "";
    },
    async set(paymentMethodId: string) {
        await setPaymentMethod({ id: paymentMethodId });
    },
});

onMounted(async () =>  {
    await getPaymentMethods();
});
</script>

<template>
    <UtilityFieldset title="Payment Method" subtitle="Select a payment method">
        <UtilityRadioGroup v-model="selectedPaymentMethod" :model="selectedPaymentMethod" :group="paymentMethods" :itemKey="'id'" />
    </UtilityFieldset>
</template>
