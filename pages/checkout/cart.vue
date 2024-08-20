<script setup lang="ts">
const { refreshCart, isEmpty, cartItems } = useCart();

onMounted(async () => {
    await refreshCart();
});
</script>

<template>
    <div class="container">
        <h1>Shopping Cart</h1>

        <div
            v-if="!isEmpty"
            class="mb-4 mt-4 flex w-full flex-wrap gap-8 lg:flex-nowrap"
        >
            <div class="w-full lg:w-2/3">
                <ul class="divide-y divide-gray-medium border-t border-gray-medium">
                    <li
                        v-for="cartItem in cartItems"
                        :key="cartItem.id"
                        class="flex py-6"
                    >
                        <CheckoutLineItem :line-item="cartItem" />
                    </li>
                </ul>
            </div>
            <div class="w-full lg:w-1/3">
                <CheckoutSummary />

                <NuxtLink
                    class="mt-4 flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-white"
                    data-testid="cart-checkout-link"
                    :to="'/checkout/confirm'"
                >
                    Checkout
                </NuxtLink>
            </div>
        </div>

        <template v-else>
            <p>Your shopping cart is empty.</p>
        </template>
    </div>
</template>
