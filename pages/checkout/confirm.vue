<script setup lang="ts">
import { getShippingMethodDeliveryTime } from "@shopware-pwa/helpers-next";

const customerStore = useCustomerStore();

const {
    refreshSessionContext,
    selectedShippingMethod: shippingMethod,
    setShippingMethod,
} = useSessionContext();

const { refreshCart, isEmpty, cartItems } = useCart();
const {
    shippingMethods,
    getShippingMethods,
} = useCheckout();

const isLoading = reactive<{ [key: string]: boolean }>({});

const selectedShippingMethod = computed({
    get(): string {
        return shippingMethod.value?.id || "";
    },
    async set(shippingMethodId: string) {
        isLoading[shippingMethodId] = true;
        await setShippingMethod({ id: shippingMethodId });
        isLoading[shippingMethodId] = false;
    },
});

onMounted(async () =>  {
    await refreshSessionContext();
    await refreshCart();

    isLoading["shippingMethods"] = true;

    Promise.any([
        getShippingMethods(),
    ]).finally(() => {
        isLoading["shippingMethods"] = false;
    });
});
</script>

<template>
    <div class="container">
        <h1>Checkout</h1>

        <template v-if="!isEmpty">
            <div class="flex gap-6 my-6">
                <div class="w-1/2 shadow p-4 rounded-md">
                    <template v-if="customerStore.customer">
                        <h3 class="text-lg font-medium">
                            Personal Information
                        </h3>
                        <div class="text-sm">
                            You are logged in as {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}
                        </div>
                    </template>

                    <template v-else>
                        <!-- TODO: login / register formular anzeigen -->
                        not logged in
                    </template>

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

                        <!-- Loading Animation -->
                        <div v-if="isLoading['shippingMethods']" class="w-60 h-24">
                            <div
                                class="flex animate-pulse flex-row items-top pt-4 h-full space-x-5"
                            >
                                <div class="w-4 bg-secondary-300 h-4 mt-1 rounded-full" />
                                <div class="flex flex-col space-y-3">
                                    <div class="w-36 bg-secondary-300 h-6 rounded-md" />
                                    <div class="w-24 bg-secondary-300 h-6 rounded-md" />
                                </div>
                            </div>
                        </div>

                        <div
                            v-for="singleShippingMethod in shippingMethods"
                            v-else
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
                                :data-testid="`checkout-shipping-method-${singleShippingMethod.id}`"
                            />

                            <label
                                :for="singleShippingMethod.id"
                                :class="{ 'animate-pulse': isLoading[singleShippingMethod.id] }"
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

                    <!-- TODO -->
                    - payment

                    <!-- TODO -->
                    - billing address

                    <!-- TODO -->
                    - terms & conditions
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