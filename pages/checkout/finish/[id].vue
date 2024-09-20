<script setup lang="ts">
const { params } = useRoute();
const { checkoutBreadcrumbs } = useStaticBreadcrumbs();
const orderId = params.id as string;
const { order, loadOrderDetails, shippingAddress, billingAddress, shippingMethod, paymentMethod, status, total } =
    useOrderDetails(orderId);
const { getFormattedPrice } = usePrice();

const dateFormat = 'DD.MM.YYYY';
const formattedOrderDate = useDateFormat(order.orderDate, dateFormat, {
    locales: (typeof navigator !== 'undefined' && navigator.language) || 'en-US',
});

useBreadcrumbs(checkoutBreadcrumbs({ index: 2, orderId: orderId }));

onMounted(async () => {
    await loadOrderDetails();
});
</script>

<template>
    <div class="container">
        <template v-if="order">
            <div class="text-center">
                <h1 class="mb-6">{{ $t('checkout.finish.heading') }}</h1>

                <p class="mb-4">
                    {{ $t('checkout.finish.confirmationInfo') }}
                    <br />
                    {{ $t('checkout.finish.emailInfo') }}
                </p>
            </div>

            <div
                v-if="order"
                class="flex justify-center divide-x divide-gray py-4"
            >
                <div class="pr-3 text-center">
                    {{ $t('checkout.finish.orderNumberLabel') }}
                    <span class="font-bold text-gray-dark"> #{{ order.orderNumber }} </span>
                </div>

                <div class="px-3 text-center">
                    {{ $t('checkout.finish.orderDateLabel') }}
                    <span class="font-bold text-gray-dark">
                        {{ formattedOrderDate }}
                    </span>
                </div>

                <div class="px-3 text-center">
                    {{ $t('checkout.finish.orderStatusLabel') }}
                    <span class="font-bold text-gray-dark">
                        {{ status }}
                    </span>
                </div>

                <div class="pl-3 text-center">
                    {{ $t('checkout.finish.totalAmountLabel') }}
                    <span class="font-bold text-gray-dark">
                        {{ getFormattedPrice(total) }}
                    </span>
                </div>
            </div>

            <NuxtLink
                class="mx-auto flex max-w-80 justify-center text-brand-primary"
                :to="'/account/orders'"
            >
                {{ $t('checkout.finish.orderHistoryLinkLabel') }}
            </NuxtLink>

            <div class="grid gap-6 pt-6 lg:grid-cols-2">
                <div class="divide-y divide-gray-medium rounded-md p-4 shadow">
                    <div class="pb-4">
                        <div class="mb-2 font-bold">{{ $t('checkout.finish.billingAddressHeading') }}</div>

                        <OrderAddressBilling :billing-address="billingAddress" />
                    </div>

                    <div class="py-4">
                        <div class="mb-2 font-bold">{{ $t('checkout.finish.shippingAddressHeading') }}</div>

                        <OrderAddressShipping
                            :shipping-address="shippingAddress"
                            :billing-address="billingAddress"
                        />
                    </div>

                    <div class="py-4">
                        <div class="mb-2 font-bold">{{ $t('checkout.finish.paymentMethodHeading') }}</div>

                        <OrderPayment :payment-method="paymentMethod" />
                    </div>

                    <div class="pt-4">
                        <div class="mb-2 font-bold">{{ $t('checkout.finish.shippingMethodHeading') }}</div>

                        <OrderShipping :shipping-method="shippingMethod" />
                    </div>
                </div>

                <div class="rounded-md p-4 shadow">
                    <p class="font-bold">{{ $t('checkout.lineItemsHeading') }}</p>

                    <ul class="divide-y divide-gray-medium">
                        <li
                            v-for="orderItem in order.lineItems"
                            :key="orderItem.id"
                            class="flex py-6"
                        >
                            <OrderLineItem :line-item="orderItem" />
                        </li>
                    </ul>

                    <OrderSummary
                        class="rounded-md"
                        :order="order"
                    />
                </div>
            </div>
        </template>
    </div>
</template>
