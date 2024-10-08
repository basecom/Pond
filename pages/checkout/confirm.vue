<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';

const customerStore = useCustomerStore();
const { checkoutBreadcrumbs } = useStaticBreadcrumbs();
const { push } = useRouter();
const { refreshCart, isEmpty, cartItems } = useCart();
const { createOrder } = useCheckout();
const { pushError, pushSuccess } = useNotifications();
const { t } = useI18n();

const placeOrder = async () => {
    try {
        const order = await createOrder();
        await push('/checkout/finish/' + order.id);
        await refreshCart();

        pushSuccess(t('checkout.confirm.order.successMessage'));
    } catch (error) {
        pushError(t('checkout.confirm.order.errorMessage'));

        if (error instanceof ApiClientError) {
            console.log(error.details);
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

                        <!-- TODO: Address Management (BUS-841) -->

                        <CheckoutConfirmTerms />
                    </div>

                    <div class="rounded-md p-4 shadow">
                        <div class="font-bold">{{ $t('checkout.lineItemsHeading') }}</div>

                        <ul class="divide-y divide-gray-medium">
                            <li
                                v-for="cartItem in cartItems"
                                :key="cartItem.id"
                                class="flex py-6"
                            >
                                <CheckoutLineItem :line-item="cartItem" />
                            </li>
                        </ul>

                        <CheckoutSummary />

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

        <template v-else> {{ $t('checkout.confirm.emptyCartMessage') }} </template>
    </div>
</template>
