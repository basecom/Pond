<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';

const customerStore = useCustomerStore();
const { refreshSessionContext } = useSessionContext();
const { push } = useRouter();
const { refreshCart, isEmpty, cartItems } = useCart();
const { createOrder } = useCheckout();

const placeOrder = async () => {
    try {
        const order = await createOrder();
        await push('/checkout/finish/' + order.id);
        await refreshCart();
    } catch (error) {
        if (error instanceof ApiClientError) {
            // TODO: User Feedback (BUS-843)
            console.log(error.details);
        }
    }
};

onMounted(async () => {
    await refreshSessionContext();
    await refreshCart();
});
</script>

<template>
    <div class="container">
        <h1>Checkout</h1>

        <template v-if="!isEmpty">
            <FormKit
                type="form"
                :actions="false"
                :incomplete-message="false"
                @submit="placeOrder"
            >
                <div class="my-6 flex gap-6">
                    <div class="w-1/2 divide-y divide-gray-medium rounded-md p-4 shadow">
                        <CheckoutConfirmLoginInformation />
                        <CheckoutConfirmShipping />
                        <CheckoutConfirmPayment />

                        <!-- TODO: Address Management (BUS-841) -->

                        <CheckoutConfirmTerms />
                    </div>

                    <div class="w-1/2 rounded-md p-4 shadow">
                        <h3>Products</h3>

                        <ul class="divide-y divide-gray-medium">
                            <li
                                v-for="cartItem in cartItems"
                                :key="cartItem.id"
                                class="flex py-6"
                            >
                                <CheckoutLineItem :line-item="cartItem" />
                            </li>
                        </ul>

                        <CheckoutSummary />

                        <button
                            v-if="customerStore.customer"
                            class="mt-4 flex w-full cursor-pointer items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-white"
                        >
                            Order
                        </button>

                        <div
                            v-else
                            class="mt-4 flex cursor-not-allowed items-center justify-center rounded-md bg-gray-dark px-6 py-3 text-white"
                            disabled="disabled"
                        >
                            Log in to place order
                        </div>
                    </div>
                </div>
            </FormKit>
        </template>

        <template v-else> Your cart is empty </template>
    </div>
</template>
