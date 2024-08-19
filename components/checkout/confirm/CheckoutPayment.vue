<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from "radix-vue";

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
            <h3 class="text-lg font-medium">
                Payment Method
            </h3>
            <div class="text-sm">
                Select a payment method
            </div>
        </legend>

        <RadioGroupRoot v-model="selectedPaymentMethod" class="flex gap-4 flex-wrap">
            <div
                v-for="singlePaymentMethod in paymentMethods"
                :key="singlePaymentMethod.id"
                class="flex w-full"
            >
                <RadioGroupItem
                    :value="singlePaymentMethod.id"
                    class="flex items-center group"
                >
                    <div class="min-w-[14px] min-h-[14px] rounded-[50%] outline outline-1 outline-gray-dark group-data-[state=checked]:outline-brand-primary-dark">
                        <RadioGroupIndicator class="flex items-center justify-center relative after:content-[''] after:block after:w-[10px] after:h-[10px] mt-[2px] after:rounded-[50%] after:bg-brand-primary-dark" />
                    </div>

                    <label
                        :for="singlePaymentMethod.id"
                        class="ml-2 block text-sm font-medium cursor-pointer text-left"
                    >
                        <div class="flex justify-between">
                            <div>
                                <span>
                                  {{ singlePaymentMethod.translated.name }}
                                </span>

                                <span
                                    v-if="singlePaymentMethod.translated.description"
                                    class="italic text-sm text-secondary-500 block"
                                >
                                    {{ singlePaymentMethod.translated.description }}
                                </span>
                            </div>

                            <div v-if="singlePaymentMethod.media?.url">
                                <img
                                    loading="lazy"
                                    :src="singlePaymentMethod.media.url"
                                    :alt="`Logo of ${singlePaymentMethod.shortName}`"
                                />
                            </div>
                        </div>
                    </label>
                </RadioGroupItem>
            </div>
        </RadioGroupRoot>

<!--        <div-->
<!--            v-for="singlePaymentMethod in paymentMethods"-->
<!--            :key="singlePaymentMethod.id"-->
<!--            class="flex items-center"-->
<!--        >-->
<!--            <input-->
<!--                :id="singlePaymentMethod.id"-->
<!--                v-model="selectedPaymentMethod"-->
<!--                :value="singlePaymentMethod.id"-->
<!--                name="payment-method"-->
<!--                type="radio"-->
<!--                class="h-4 w-4 cursor-pointer"-->
<!--            />-->

<!--            <label-->
<!--                :for="singlePaymentMethod.id"-->
<!--                class="ml-2 block text-sm font-medium w-full"-->
<!--            >-->
<!--                <div class="flex justify-between">-->
<!--                    <div>-->
<!--                                        <span>-->
<!--                                          {{ singlePaymentMethod.translated.name }}-->
<!--                                        </span>-->

<!--                        <span-->
<!--                            v-if="singlePaymentMethod.translated.description"-->
<!--                            class="italic text-sm text-secondary-500 block"-->
<!--                        >-->
<!--                                            {{ singlePaymentMethod.translated.description }}-->
<!--                                        </span>-->
<!--                    </div>-->

<!--                    <div v-if="singlePaymentMethod.media?.url">-->
<!--                        <img-->
<!--                            loading="lazy"-->
<!--                            :src="singlePaymentMethod.media.url"-->
<!--                            :alt="`Logo of ${singlePaymentMethod.shortName}`"-->
<!--                        />-->
<!--                    </div>-->
<!--                </div>-->
<!--            </label>-->
<!--        </div>-->
    </fieldset>
</template>
