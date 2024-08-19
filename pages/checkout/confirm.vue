<script setup lang="ts">
import CheckoutLoginInformation from "~/components/checkout/confirm/CheckoutLoginInformation.vue";
import CheckoutShipping from "~/components/checkout/confirm/CheckoutShipping.vue";
import CheckoutPayment from "~/components/checkout/confirm/CheckoutPayment.vue";

const customerStore = useCustomerStore();

const {
    refreshSessionContext
} = useSessionContext();

const { push } = useRouter();

const { refreshCart, isEmpty, cartItems } = useCart();

const { createOrder } = useCheckout();

const placeOrderTriggered = ref(false);

const terms = reactive({
    tos: false,
});

const termsSelected = computed(() => {
    return terms.tos;
});

const termsBox = ref();

const placeOrder = async () => {
    placeOrderTriggered.value = true;

    if (!termsSelected.value) {
        termsBox.value.scrollIntoView({ behavior: "smooth" });
        return;
    }

    const order = await createOrder();
    await push("/checkout/finish/" + order.id);

    await refreshCart();
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
            <div class="flex gap-6 my-6">
                <div class="w-1/2 shadow p-4 rounded-md">
                    <CheckoutLoginInformation />
                    <CheckoutShipping />
                    <CheckoutPayment />

                    <!-- TODO: Address Management (BUS-841) -->

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
                                class="h-4 w-4 shrink-0 cursor-pointer"
                            />

                            <label
                                for="tos"
                                class="ml-2 block text-sm font-medium"
                                :class="{ 'text-status-danger': !termsSelected && placeOrderTriggered }"
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

                    <div v-if="customerStore.customer"
                        class="flex items-center justify-center bg-brand-primary text-white rounded-md px-6 py-3 mt-4 cursor-pointer"
                        @click="placeOrder"
                    >
                        Order
                    </div>

                    <div v-else class="flex items-center justify-center bg-gray-dark text-white rounded-md px-6 py-3 mt-4 cursor-not-allowed" disabled="disabled">
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