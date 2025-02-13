<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { RouteIdParams } from '~/types/RouteParams';

await useAuthentication().rerouteIfLoggedOut();

const route = useRoute();
const orderId = (route.params as RouteIdParams).id;
const { order, loadOrderDetails, shippingMethod, paymentMethod, changePaymentMethod, shippingAddress, billingAddress } =
    useOrderDetails(orderId);
const { pushError, pushSuccess } = useNotifications();
const { t } = useI18n();

const newPaymentMethod = ref<string | undefined>(undefined);

const updateMethod = (methodId: string) => (newPaymentMethod.value = methodId);

const updateOrder = async () => {
    if (!newPaymentMethod.value) {
        return;
    }

    try {
        const response: Schemas['SuccessResponse'] = await changePaymentMethod(newPaymentMethod.value);

        if (response.success) {
            navigateTo(`/checkout/finish/${orderId}`);

            pushSuccess(t('account.order.edit.successMessage'));
        } else {
            pushError(t('account.order.edit.errorMessage'));
        }
    } catch (error) {
        pushError(t('account.order.edit.errorMessage'));
    }
};

useAnalytics({ trackPageView: true, pageType: 'editOrder' });

onMounted(async () => {
    await loadOrderDetails();
});
</script>

<template>
    <div class="container">
        <template v-if="order">
            <h1>{{ $t('account.order.edit.heading') }}</h1>
            <FormKit
                type="form"
                :actions="false"
                :incomplete-message="false"
                @submit="updateOrder"
                @keydown.enter.prevent
            >
                <div class="my-6 grid gap-6 lg:grid-cols-2">
                    <div class="divide-y divide-gray-medium rounded-md p-4 shadow">
                        <AccountOrderConfirmPersonal />
                        <AccountOrderConfirmShipping :method="shippingMethod" />
                        <AccountOrderConfirmPayment
                            :payment-method="paymentMethod"
                            @update-method="updateMethod"
                        />
                        <AccountOrderConfirmAddress
                            :shipping-address="shippingAddress"
                            :billing-address="billingAddress"
                        />
                        <AccountOrderConfirmTerms />

                        <CheckoutConfirmCard v-if="order.customerComment" :title="t('checkout.finish.customerCommentLabel')">
                            <OrderComment :customer-comment="order.customerComment" />
                        </CheckoutConfirmCard>
                    </div>

                    <div class="rounded-md p-4 shadow">
                        <div class="font-bold">{{ $t('checkout.lineItemsHeading') }}</div>

                        <ul class="divide-y divide-gray-medium pb-2">
                            <div
                                v-for="(lineItem, index) in order.lineItems"
                                :key="lineItem.id"
                            >
                                <div class="mt-4 flex w-full">
                                    <OrderLineItem :line-item="lineItem" />
                                </div>
                                <hr
                                    v-if="index !== order.lineItems.length - 1"
                                    class="w-full"
                                >
                            </div>
                        </ul>

                        <OrderSummary
                            :is-account-order-item="true"
                            :order="order"
                            class="-mx-4 rounded-b-lg"
                        />

                        <FormKit
                            type="submit"
                            :disabled="!newPaymentMethod"
                            :classes="{
                                outer: 'mt-4',
                            }"
                        >
                            {{ $t('account.order.edit.buttonLabel') }}
                        </FormKit>
                    </div>
                </div>
            </FormKit>
        </template>

        <UtilityStaticNotification
            v-else
            :id="Math.floor((Math.random() * 100) + 1)"
            type="info"
            :message="$t('account.order.edit.noOrderFound')"
            class="mt-4"
        />
    </div>
</template>
