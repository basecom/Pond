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

const placeOrder = async (formData: any) => {
    try {
        const order = await createOrder(
            {
                'customerComment': formData.customerComment ?? '',
            }
        );
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
                <div class="grid gap-6 my-6 lg:grid-cols-2">
                    <div class="p-4 divide-y rounded-md shadow divide-gray-medium">
                        <CheckoutConfirmPersonal />
                        <CheckoutConfirmShipping />
                        <CheckoutConfirmPayment />
                        <CheckoutConfirmAddress v-if="customerStore.customer" />
                        <CheckoutConfirmTerms />
                        <CheckoutConfirmCustomerComment />
                    </div>

                    <div class="p-4 rounded-md shadow">
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

                        <FormKit
                            v-if="customerStore.customer"
                            type="submit"
                            :classes="{
                                outer: 'mt-4',
                            }"
                        >
                            {{ $t('checkout.confirm.order.buttonLabel') }}
                        </FormKit>

                        <FormKit
                            v-else
                            type="submit"
                            disabled="disabled"
                            :classes="{
                                outer: 'mt-4',
                            }"
                        >
                            {{ $t('checkout.confirm.order.buttonLabelNotLoggedIn') }}
                        </FormKit>
                    </div>
                </div>
            </FormKit>
        </template>

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
