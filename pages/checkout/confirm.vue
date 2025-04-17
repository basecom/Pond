<script setup lang="ts">
import type { OrderForm } from '~/types/form/CheckoutForm';

const customerStore = useCustomerStore();
const { checkoutBreadcrumbs } = useStaticBreadcrumbs();
const { push } = useRouter();
const { handleError } = useHandleError();
const { refreshCart, isEmpty } = useCart();
const cartItemsStore = useCartItemsStore();
const { cartItemsWithProduct } = storeToRefs(cartItemsStore);
const { createOrderWrapper } = useOrderHelper();
const { pushError, pushSuccess } = useNotifications();
const { t } = useI18n();
const { trackPurchase } = useAnalytics({ trackPageView: true, pageType: 'checkout' });
const configStore = useConfigStore();
const showCustomerComment = configStore.get('core.cart.showCustomerComment');

const placeOrder = async (formData: OrderForm) => {
    try {
        const order = await createOrderWrapper({
            customerComment: formData.customerComment ?? '',
        });

        await push(`/checkout/finish/${  order.id}`);
        trackPurchase(order);
        await refreshCart();

        pushSuccess(t('checkout.confirm.order.successMessage'));
    } catch (error) {
        pushError(t('checkout.confirm.order.errorMessage'));
        handleError(error);
    } finally {
        // TODO: Instead of logging out handle guest state in account area by toggeling options
        if (customerStore.customer.guest) {
            await customerStore.logout();
        }
    }
};

useBreadcrumbs(checkoutBreadcrumbs({ index: 1 }));

onMounted(async () => {
    await customerStore.refreshContext();
});
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
                        <CheckoutConfirmCustomerComment v-if="showCustomerComment" />
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
                                    v-if="item.product"
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
                            :disabled="true"
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
                type="info"
                :message="$t('checkout.cart.emptyCartMessage')"
                class="mt-4"
            />
        </template>
    </div>
</template>
