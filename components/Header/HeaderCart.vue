<script setup lang="ts">
const offcanvasCartController = useModal();
const { cartItems, isEmpty } = useCart();
const { getCartItemsCount } = useCartItems();

const cartItemCount = computed(() => getCartItemsCount(cartItems.value));
</script>

<template>
    <button
        class="relative"
        @click="offcanvasCartController.open()"
    >
        <FormKitIcon
            icon="cart-shopping"
            class="block h-6 w-6"
        />
        <SharedPill
            :number="cartItemCount"
            class="absolute bottom-2.5 left-3"
        />
    </button>

    <LazySharedSidebar
        v-if="offcanvasCartController.isOpen"
        :controller="offcanvasCartController"
        side="right"
    >
        <template #content>
            <div v-if="!isEmpty">
                <ul class="divide-y divide-gray-medium border-t border-gray-medium pb-4">
                    <li
                        v-for="cartItem in cartItems"
                        :key="cartItem.id"
                        class="flex py-6"
                    >
                        <CheckoutLineItem :line-item="cartItem" />
                    </li>
                </ul>
                <CheckoutSummary :reduced-display="true" />
            </div>

            <NuxtLink
                to="/checkout/cart"
                class="mt-4 flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-white"
                @click="offcanvasCartController.close()"
            >
                to the cart
            </NuxtLink>
        </template>
    </LazySharedSidebar>
</template>
