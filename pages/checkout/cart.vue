<script setup lang="ts">
const { isEmpty, cartItems } = useCart();
const { checkoutBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(checkoutBreadcrumbs({ index: 0 }));
</script>

<template>
    <div class="container">
        <h1>{{ $t('checkout.cart.heading') }}</h1>

        <div
            v-if="!isEmpty"
            class="my-4 flex w-full flex-wrap gap-8 lg:flex-nowrap"
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
            <div class="flex w-full flex-col gap-4 lg:w-1/3">
                <CheckoutSummary />

                <CheckoutPromotion />

                <NuxtLink
                    class="flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-white"
                    :to="'/checkout/confirm'"
                >
                    {{ $t('checkout.cart.checkoutButtonLabel') }}
                </NuxtLink>
            </div>
        </div>

        <template v-else>
            <UtilityStaticNotification
                id="empty-cart"
                type="info"
                :message="$t('checkout.cart.emptyCartMessage')"
                class="mt-4"
            />
        </template>
    </div>
</template>
