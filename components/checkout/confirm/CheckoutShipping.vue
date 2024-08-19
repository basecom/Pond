<script setup lang="ts">
import { getShippingMethodDeliveryTime } from "@shopware-pwa/helpers-next";
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'radix-vue'

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

        <RadioGroupRoot v-model="selectedShippingMethod" class="flex gap-4 flex-wrap">
            <div
                v-for="singleShippingMethod in shippingMethods"
                :key="singleShippingMethod.id"
                class="flex w-full"
            >
                <RadioGroupItem
                    :value="singleShippingMethod.id"
                    class="flex items-center group"
                >
                    <div class="min-w-[14px] min-h-[14px] rounded-[50%] outline outline-1 outline-gray-dark group-data-[state=checked]:outline-brand-primary-dark">
                        <RadioGroupIndicator class="flex items-center justify-center relative after:content-[''] after:block after:w-[10px] after:h-[10px] mt-[2px] after:rounded-[50%] after:bg-brand-primary-dark" />
                    </div>

                    <label
                        :for="singleShippingMethod.id"
                        class="ml-2 block text-sm font-medium cursor-pointer text-left"
                    >
                        <div class="flex justify-between">
                            <div>
                                {{ singleShippingMethod.translated.name }}

                                <span
                                    v-if="getShippingMethodDeliveryTime(singleShippingMethod)"
                                >
                                    ({{ getShippingMethodDeliveryTime(singleShippingMethod) }})
                                </span>

                                <span
                                    v-if="singleShippingMethod.translated.description"
                                    class="italic text-sm block"
                                >
                                    {{ singleShippingMethod.translated.description }}
                                </span>
                            </div>

                            <template v-if="singleShippingMethod.media?.url">
                                <img
                                    loading="lazy"
                                    :src="singleShippingMethod.media.url"
                                    alt="payment-image"
                                />
                            </template>
                        </div>
                    </label>
                </RadioGroupItem>
            </div>
        </RadioGroupRoot>
    </fieldset>
</template>
