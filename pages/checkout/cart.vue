<script setup lang="ts">
const { refreshCart, isEmpty, cartItems } = useCart();

onMounted(async () =>  {
    await refreshCart();
});
</script>

<template>
    <div class="container">
        <h1>Shopping Cart</h1>

        <div v-if="!isEmpty" class="flex flex-wrap lg:flex-nowrap w-full mt-4 mb-4 gap-8">
            <div class="w-full lg:w-2/3">
                <ul class="border-t border-gray-medium divide-y divide-gray-medium">
                    <li v-for="cartItem in cartItems" :key="cartItem.id" class="flex py-6">
                        <CheckoutLineItem :lineItem="cartItem"/>
                    </li>
                </ul>
            </div>
            <div class="w-full lg:w-1/3">
                <CheckoutSummary />

                <NuxtLink
                    class="flex items-center justify-center bg-brand-primary text-white rounded-md px-6 py-3 mt-4"
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
