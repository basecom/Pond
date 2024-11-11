<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    orderId: string;
}>();

const { order, loadOrderDetails, shippingMethod, paymentMethod, status, shippingAddress, billingAddress } =
    useOrderDetails(props.orderId, {
        stateMachineState: {},
    });

const { state: paymentState } = useOrderPayment(order);

const shippingStatus = computed(() => {
    const stateName = order.value?.deliveries?.[0]?.stateMachineState?.translated?.name;
    return stateName ? { name: stateName } : null;
});

const isPaymentNeeded = computed(() => {
    const transactions = order.value?.transactions;
    if (!transactions) {
        return false;
    }

    const lastTransaction: Schemas['OrderTransaction'] = transactions[transactions.length - 1];
    const stateNamesForPaymentNeeded = ['failed', 'reminded', 'unconfirmed', 'cancelled'];
    const transactionStateName = lastTransaction.stateMachineState.technicalName;
    const isTransactionStateInNeedOfPayment = stateNamesForPaymentNeeded.includes(transactionStateName);
    const isOrderNotCanceled = order.value.stateMachineState.technicalName !== 'cancelled';

    return isTransactionStateInNeedOfPayment && isOrderNotCanceled;
});

const formattedOrderDate = computed(() => {
    if (order.value?.orderDate) {
        return useDateFormat(order.value.orderDate, 'DD.MM.YYYY', {
            locales: (typeof navigator !== 'undefined' && navigator.language) || 'en-US',
        });
    }

    return undefined;
});

onMounted(async () => {
    await loadOrderDetails();
});
</script>

<template>
    <SharedAccordionItem
        class="overflow-hidden"
        :value="`item-${orderId}`"
        headline-classes="flex w-full items-center justify-between gap-4 px-4 py-2 bg-white"
        trigger-classes="h-6 w-6 self-baseline mt-3.5 ml-auto"
    >
        <template #title>
            <div class="py-2">
                <div class="flex flex-wrap gap-4 text-left">
                    <div
                        v-if="order"
                        class="w-full text-2xl font-bold"
                    >
                        <template v-if="formattedOrderDate"> {{ formattedOrderDate }} - </template>

                        {{ $t('checkout.finish.orderNumberLabel') }} {{ order.orderNumber }}
                    </div>

                    <div
                        v-if="status"
                        class="rounded-full bg-status-info px-4 py-2 text-white"
                    >
                        {{ status }}
                    </div>

                    <NuxtLink
                        v-if="isPaymentNeeded"
                        class="rounded-md bg-brand-primary px-2 py-2 text-white"
                        :to="`/account/order/edit/${orderId}`"
                    >
                        {{ $t('account.orders.changePaymentMethod') }}
                    </NuxtLink>
                </div>

                <div class="gap-12 text-left lg:flex">
                    <AccountOrderItemInfo
                        :title="$t('account.orders.paymentStatusLabel')"
                        :state="paymentState"
                    />

                    <AccountOrderItemInfo
                        :title="$t('account.orders.paymentMethodLabel')"
                        :method="paymentMethod"
                    />

                    <AccountOrderItemInfo
                        :title="$t('account.orders.shippingStatusLabel')"
                        :state="shippingStatus"
                    />

                    <AccountOrderItemInfo
                        :title="$t('account.orders.shippingMethodLabel')"
                        :method="shippingMethod"
                    />
                </div>
            </div>
        </template>

        <template #content>
            <div class="py-4">
                <div class="pb-4">
                    <div class="mb-2 font-bold">
                        {{ $t('checkout.finish.shippingAddressHeading') }}
                    </div>

                    <div>
                        <OrderAddressShipping
                            :shipping-address="shippingAddress"
                            :billing-address="billingAddress"
                        />
                    </div>
                </div>

                <div class="mt-5 font-bold">{{ $t('account.orders.lineItemsHeading') }}</div>
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
            </div>
            <OrderSummary
                :is-account-order-item="true"
                :order="order"
                class="-mx-4 rounded-b-lg"
            />
        </template>
    </SharedAccordionItem>
</template>
