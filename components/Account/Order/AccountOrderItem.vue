<script setup lang="ts">
const props = defineProps<{
    orderId: string;
}>();

const { order, loadOrderDetails, shippingMethod, paymentMethod, status } = useOrderDetails(props.orderId);

const { state: paymentState } = useOrderPayment(order);

const shippingStatus = computed(() => {
    const stateName = order.value?.deliveries?.[0]?.stateMachineState?.translated?.name;
    return stateName ? { name: stateName } : null;
});

const orderStatusTechnical = computed(() => {
  const delivery = order.value?.deliveries?.[0];
  const stateTechnicalName = delivery?.stateMachineState?.technicalName;
  return stateTechnicalName ? stateTechnicalName : null;
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
                      class="ml-auto rounded-md px-2 py-2 text-white bg-status-success"
                      v-if="orderStatusTechnical && orderStatusTechnical !=='done'"
                      :to="`/order/edit/${orderId}`"
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
