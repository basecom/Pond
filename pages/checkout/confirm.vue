<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';

const customerStore = useCustomerStore();
const { checkoutBreadcrumbs } = useStaticBreadcrumbs();
const { push } = useRouter();
const { refreshCart, isEmpty } = useCart();
const cartItemsStore = useCartItemsStore();
const { cartItemsWithProduct } = storeToRefs(cartItemsStore);
const { createOrder } = useCheckout();
const { pushError, pushSuccess } = useNotifications();
const { t } = useI18n();
const { trackPurchase } = useAnalytics({ trackPageView: true, pageType: 'checkout' });

const placeOrder = async () => {
    try {
        const order = await createOrder();
        await push('/checkout/finish/' + order.id);
        trackPurchase(order);
        await refreshCart();

        pushSuccess(t('checkout.confirm.order.successMessage'));
    } catch (error) {
        pushError(t('checkout.confirm.order.errorMessage'));

        if (error instanceof ApiClientError) {
            console.log(error.details);
        }
    } finally {
        // TODO: Instead of logging out handle guest state in account area by toggeling options
        if (customerStore.customer.guest) {
            await customerStore.logout();
        }
    }
};

useBreadcrumbs(checkoutBreadcrumbs({ index: 1 }));
</script>

<template>
    <div class="container">
        <h1>{{ $t('checkout.confirm.heading') }}</h1>

        <template v-if="!isEmpty">
            <FormKit
                type="form"
                :actions="false"
                :incomplete-message="false"
                @submit="placeOrder"
                @keydown.enter.prevent
            >
                <div class="my-6 grid gap-6 lg:grid-cols-2">
                    <div class="divide-y divide-gray-medium rounded-md p-4 shadow">
                        <CheckoutConfirmPersonal />
                        <CheckoutConfirmShipping />
                        <CheckoutConfirmPayment />
                        <CheckoutConfirmAddress v-if="customerStore.customer" />
                        <CheckoutConfirmTerms />
                    </div>

                    <div class="rounded-md p-4 shadow">
                        <div class="font-bold">{{ $t('checkout.lineItemsHeading') }}</div>

                        <ul class="divide-y divide-gray-medium">
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

                        <CheckoutSummary />

                        <CheckoutPromotion />

                        <button
                            v-if="customerStore.customer"
                            class="mt-4 flex w-full cursor-pointer items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-white"
                        >
                            {{ $t('checkout.confirm.order.buttonLabel') }}
                        </button>

                        <div
                            v-else
                            class="mt-4 flex cursor-not-allowed items-center justify-center rounded-md bg-gray-dark px-6 py-3 text-white"
                            disabled="disabled"
                        >
                            {{ $t('checkout.confirm.order.buttonLabelNotLoggedIn') }}
                        </div>
                    </div>
                </div>
            </FormKit>
        </template>

        <template v-else> {{ $t('checkout.confirm.emptyCartMessage') }}</template>
    </div>
</template>
