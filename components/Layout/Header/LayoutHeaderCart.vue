<script setup lang="ts">
const offcanvasCartController = useModal();
const { isEmpty } = useCart();
const cartItemsStore = useCartItemsStore();
const { cartItemsWithProduct, cartItemsCount } = storeToRefs(cartItemsStore);
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
        <UtilityPill
            :number="cartItemsCount"
            class="absolute bottom-2.5 left-3"
        />
    </button>

    <LazyLayoutSidebar
        v-if="offcanvasCartController.isOpen"
        :controller="offcanvasCartController"
        side="right"
    >
        <template #content>
            <div v-if="!isEmpty">
                <ul class="divide-y divide-gray-medium border-t border-gray-medium pb-4">
                    <li
                        v-for="item in cartItemsWithProduct"
                        :key="item.cartItem.id"
                        class="flex py-6"
                    >
                        <CheckoutLineItem
                            :line-item="item.cartItem"
                            :product="item.product"
                        />
                    </li>
                </ul>
                <CheckoutSummary :reduced-display="true" />
            </div>

            <NuxtLink
                to="/checkout/cart"
                class="mt-4 flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-white"
                @click="offcanvasCartController.close()"
            >
                {{ $t('checkout.offcanvasCart.toCartButtonLabel') }}
            </NuxtLink>
        </template>
    </LazyLayoutSidebar>
</template>
