<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    orderId: string;
}>();

const { order, loadOrderDetails, shippingMethod, paymentMethod, status } = useOrderDetails(props.orderId, {
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
        headline-classes="bg-white rounded-lg"
        :headline-default-text-style="false"
    >
        <template #title>
            <div class="mt-4 p-4">
                <div class="mt-4 flex gap-4">
                    <div
                        v-if="formattedOrderDate"
                        class="text-4xl font-bold"
                    >
                        {{ formattedOrderDate }}
                    </div>

                    <div
                        v-if="status"
                        class="rounded-full bg-status-info px-4 py-2 text-white"
                    >
                        {{ status }}
                    </div>
                    <NuxtLink
                        v-if="isPaymentNeeded"
                        class="ml-auto rounded-md bg-status-success px-2 py-2 text-white"
                        :to="`/account/order/edit/${orderId}`"
                    >
                        {{ $t('account.orders.changePaymentMethod') }}
                    </NuxtLink>
                </div>

                <div class="gap-12 lg:flex">
                    <AccountOrderItemInfo
                        :title="$t('account.orders.paymentStatusLabel')"
                        :state="paymentState"
                    />
                    <AccountOrderItemInfo
                        :title="$t('account.orders.paymentMethodLabel')"
                        :state="paymentMethod"
                    />
                    <AccountOrderItemInfo
                        :title="$t('account.orders.shippingStatusLabel')"
                        :state="shippingStatus"
                    />
                    <AccountOrderItemInfo
                        :title="$t('account.orders.shippingMethodLabel')"
                        :state="shippingMethod"
                    />
                </div>
            </div>
        </template>

        <template #content>
            <div class="py-4">
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
