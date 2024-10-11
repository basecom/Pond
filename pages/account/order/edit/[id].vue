<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

useAuthentication().authenticate();

const { params } = useRoute();
const orderId = params.id as string;
const { order, loadOrderDetails, shippingMethod, paymentMethod, status, changePaymentMethod } =
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
        const response: Schemas["SuccessResponse"] = await changePaymentMethod(newPaymentMethod.value);

        if (response.success) {
            navigateTo('/checkout/finish/' + orderId);

            pushSuccess(t('account.order.edit.successMessage'));
        } else {
            pushError(t('account.order.edit.errorMessage'));
        }
    } catch ( e ) {
        pushError(t('account.order.edit.errorMessage'));
    }
};

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
                        <AccountOrderConfirmPayment :payment-method="paymentMethod" @update-method="updateMethod" />

                        <!-- TODO: Address Management (BUS-841) -->

                        <AccountOrderConfirmTerms />
                    </div>

                    <div class="rounded-md p-4 shadow">
                        <div class="font-bold">{{ $t('checkout.lineItemsHeading') }}</div>

                        <ul class="divide-y divide-gray-medium pb-2">
                            <div
                                v-for="(product, index) in order.lineItems"
                                :key="product.id"
                            >
                                <div class="mt-4 flex w-full">
                                    <OrderLineItem :line-item="product" />
                                </div>
                                <hr
                                    v-if="index !== order.lineItems.length - 1"
                                    class="w-full"
                                />
                            </div>
                        </ul>

                        <OrderSummary
                            :is-account-order-item="true"
                            :order="order"
                            class="-mx-4 rounded-b-lg"
                        />

                        <button
                            :disabled="!newPaymentMethod"
                            class="mt-4 flex w-full cursor-pointer items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-white"
                        >
                            {{ $t('account.order.edit.buttonLabel') }}
                        </button>
                    </div>
                </div>
            </FormKit>
        </template>
        <SharedBanner
            v-else
            type="info"
            :message="$t('account.order.edit.noOrderFound')"
        />
    </div>
</template>
