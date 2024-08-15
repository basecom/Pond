<script setup lang="ts">
import { getShippingMethodDeliveryTime } from "@shopware-pwa/helpers-next";

const customerStore = useCustomerStore();

const {
    refreshSessionContext,
    selectedPaymentMethod: paymentMethod,
    selectedShippingMethod: shippingMethod,
    setPaymentMethod,
    setShippingMethod,
} = useSessionContext();

const { refreshCart, isEmpty, cartItems } = useCart();
const {
    paymentMethods,
    shippingMethods,
    getPaymentMethods,
    getShippingMethods,
} = useCheckout();

const terms = reactive({
    tos: false,
});

const placeOrderTriggered = ref(false);

const selectedPaymentMethod = computed({
    get(): string {
        return paymentMethod.value?.id || "";
    },
    async set(paymentMethodId: string) {
        await setPaymentMethod({ id: paymentMethodId });
    },
});

const selectedShippingMethod = computed({
    get(): string {
        return shippingMethod.value?.id || "";
    },
    async set(shippingMethodId: string) {
        await setShippingMethod({ id: shippingMethodId });
    },
});

const termsSelected = computed(() => {
    return terms.tos;
});

onMounted(async () =>  {
    await refreshSessionContext();
    await refreshCart();

    await getPaymentMethods();
    await getShippingMethods();
});
</script>

<template>
    <div class="container">
        <h1>Checkout</h1>

        <template v-if="!isEmpty">
            <div class="flex gap-6 my-6">
                <div class="w-1/2 shadow p-4 rounded-md">
                    <fieldset class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6">
                        <legend class="pt-5">
                            <h3 class="text-lg font-medium">
                                Personal Information
                            </h3>

                            <template v-if="customerStore.customer">
                                <span class="text-sm">
                                    You are logged in as {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}
                                </span>
                            </template>

                            <template v-else>
                                <!-- TODO: login / register formular anzeigen -->
                                not logged in
                            </template>
                        </legend>
                    </fieldset>

                    <!-- Shipping Methods -->
                    <fieldset
                        class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6 mb-8"
                    >
                        <legend class="pt-5">
                            <h3 class="text-lg font-medium">
                                Shipping Method
                            </h3>
                            <div class="text-sm">
                                Select a shipping method
                            </div>
                        </legend>

                        <div
                            v-for="singleShippingMethod in shippingMethods"
                            :key="singleShippingMethod.id"
                            class="flex items-center w-full"
                        >
                            <input
                                :id="singleShippingMethod.id"
                                v-model="selectedShippingMethod"
                                :value="singleShippingMethod.id"
                                name="shipping-method"
                                type="radio"
                                class="h-4 w-4"
                            />

                            <label
                                :for="singleShippingMethod.id"
                                class="ml-2 block text-sm font-medium w-full"
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

                                    <div v-if="singleShippingMethod.media?.url">
                                        <img
                                            loading="lazy"
                                            :src="singleShippingMethod.media.url"
                                            alt="payment-image"
                                        />
                                    </div>
                                </div>
                            </label>
                        </div>
                    </fieldset>

                    <!-- Payment Methods -->
                    <fieldset class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6">
                        <legend class="pt-5">
                            <h3 class="text-lg font-medium">
                                Payment Method
                            </h3>
                            <div class="text-sm">
                                Select a payment method
                            </div>
                        </legend>

                        <div
                            v-for="singlePaymentMethod in paymentMethods"
                            :key="singlePaymentMethod.id"
                            class="flex items-center"
                        >
                            <input
                                :id="singlePaymentMethod.id"
                                v-model="selectedPaymentMethod"
                                :value="singlePaymentMethod.id"
                                name="payment-method"
                                type="radio"
                                class="h-4 w-4"
                            />

                            <label
                                :for="singlePaymentMethod.id"
                                class="ml-2 block text-sm font-medium w-full"
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
                        </div>
                    </fieldset>

                    <!-- TODO -->
                    - billing address

                    <!-- Terms & Conditions -->
                    <fieldset
                        ref="termsBox"
                        class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6"
                    >
                        <legend class="pt-5">
                            <h3 class="text-lg font-medium">
                                Terms and conditions
                            </h3>
                        </legend>

                        <div class="flex items-center">
                            <input
                                id="tos"
                                v-model="terms.tos"
                                :value="terms.tos"
                                name="tos"
                                type="checkbox"
                                class="h-4 w-4 shrink-0"
                            />

                            <label
                                for="tos"
                                class="ml-2 block text-sm font-medium"
                                :class="{ 'text-red': !termsSelected && placeOrderTriggered }"
                            >
                                I have read and accepted the general terms and conditions.
                            </label>
                        </div>
                    </fieldset>
                </div>

                <div class="w-1/2 shadow p-4 rounded-md">
                    <p class="font-medium">Products</p>

                    <ul class="divide-y divide-gray-medium">
                        <li v-for="cartItem in cartItems" :key="cartItem.id" class="flex py-6">
                            <CheckoutLineItem :lineItem="cartItem"/>
                        </li>
                    </ul>

                    <CheckoutSummary />

                    <NuxtLink v-if="customerStore.customer"
                        class="flex items-center justify-center bg-brand-primary text-white rounded-md px-6 py-3 mt-4"
                        @click="placeOrder"
                    >
                        Order
                    </NuxtLink>

                    <div v-else class="flex items-center justify-center bg-brand-primary text-white rounded-md px-6 py-3 mt-4">
                        Log in to place order
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            Your cart is empty
        </template>
    </div>
</template>