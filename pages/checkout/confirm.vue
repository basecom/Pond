<script setup lang="ts">
import { ApiClientError } from "@shopware/api-client";

const customerStore = useCustomerStore();
const {
    refreshSessionContext
} = useSessionContext();
const { push } = useRouter();
const { refreshCart, isEmpty, cartItems } = useCart();
const { createOrder } = useCheckout();

const placeOrder = async () => {
    try {
        const order = await createOrder();
        await push("/checkout/finish/" + order.id);
        await refreshCart();
    } catch(error) {
        if (error instanceof ApiClientError) {
            // TODO: User Feedback (BUS-843)
            console.log(error.details);
        }
    }
};

onMounted(async () =>  {
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
                <div class="flex gap-6 my-6">
                    <div class="w-1/2 shadow p-4 rounded-md divide-y divide-gray-medium">
                        <CheckoutConfirmLoginInformation />
                        <CheckoutConfirmShipping />
                        <CheckoutConfirmPayment />

                        <!-- TODO: Address Management (BUS-841) -->

                        <CheckoutConfirmTerms />
                    </div>

                    <div class="w-1/2 shadow p-4 rounded-md">
                        <h3>Products</h3>

                        <ul class="divide-y divide-gray-medium">
                            <li v-for="cartItem in cartItems" :key="cartItem.id" class="flex py-6">
                                <CheckoutLineItem :lineItem="cartItem"/>
                            </li>
                        </ul>

                        <CheckoutSummary />

                        <button v-if="customerStore.customer"
                                class="flex items-center justify-center bg-brand-primary w-full text-white rounded-md px-6 py-3 mt-4 cursor-pointer"
                        >
                            Order
                        </button>

                        <div v-else class="flex items-center justify-center bg-gray-dark text-white rounded-md px-6 py-3 mt-4 cursor-not-allowed" disabled="disabled">
                            Log in to place order
                        </div>
                    </div>
                </div>
            </FormKit>
        </template>

        <template v-else>
            Your cart is empty
        </template>
    </div>
</template>