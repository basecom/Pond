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
    <fieldset class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6">
        <legend class="pt-5">
            <div class="font-bold">
                Payment Method
            </div>
            <div class="text-sm">
                Select a payment method
            </div>
        </legend>

        <UtilityRadioGroup v-model="selectedPaymentMethod" :model="selectedPaymentMethod" :group="paymentMethods" :itemKey="'id'" />
    </fieldset>
</template>
