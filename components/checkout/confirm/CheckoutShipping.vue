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
    <fieldset
        class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6"
    >
        <legend class="pt-5">
            <h3 class="text-lg font-medium">
                Shipping Method
            </h3>
            <div class="text-sm">
                Select a shipping method
            </div>
        </legend>

        <UtilityRadioGroup v-model="selectedShippingMethod" :model="selectedShippingMethod" :group="shippingMethods" :itemKey="'id'" />
    </fieldset>
</template>
