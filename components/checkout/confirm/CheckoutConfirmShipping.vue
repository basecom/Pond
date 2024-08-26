<script setup lang="ts">
const {
    shippingMethods,
    getShippingMethods,
} = useCheckout();

const {
    selectedShippingMethod: shippingMethod,
    setShippingMethod,
} = useSessionContext();

const selectedShippingMethod = computed({
    get(): string {
        return shippingMethod.value?.id || "";
    },
    async set(shippingMethodId: string) {
        await setShippingMethod({ id: shippingMethodId });
    },
});

onMounted(async () =>  {
    await getShippingMethods();
});
</script>

<template>
    <UtilityFieldset title="Shipping Method" subtitle="Select a shipping method">
        <UtilityRadioGroup v-model="selectedShippingMethod" :model="selectedShippingMethod" :group="shippingMethods" :itemKey="'id'" />
    </UtilityFieldset>
</template>
