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
            class="block size-6"
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
                            v-if="item.cartItem"
                            :line-item="item.cartItem"
                            :product="item.product"
                        />
                    </li>
                </ul>
                <CheckoutSummary :reduced-display="true" />
            </div>
            <template v-else>
                <UtilityStaticNotification
                    type="info"
                    :message="$t('checkout.cart.emptyCartMessage')"
                    class="mt-4"
                />
            </template>

            <LocaleLink
                v-if="!isEmpty"
                to="/checkout/cart"
                @click="offcanvasCartController.close()"
            >
                <FormKit
                    type="submit"
                    :classes="{
                        outer: 'mt-4',
                    }"
                >
                    {{ $t('checkout.offcanvasCart.toCartButtonLabel') }}
                </FormKit>
            </LocaleLink>
            <FormKit
                v-else
                type="submit"
                ignore
                :classes="{
                    outer: 'mt-4',
                }"
                @click="offcanvasCartController.close()"
            >
                {{ $t('checkout.offcanvasCart.continueShopping') }}
            </FormKit>
        </template>
    </LazyLayoutSidebar>
</template>
