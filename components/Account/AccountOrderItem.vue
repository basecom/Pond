<script setup lang="ts">
 const props = defineProps<{
   orderId: string;
 }>();

 const {
     order,
     loadOrderDetails,
     shippingMethod,
     paymentMethod,
     status
 } = useOrderDetails(props.orderId);

 const { state: paymentState } = useOrderPayment(order);

 const isExpanded = ref(false);
 const toggleExpanded = () => {
     isExpanded.value = !isExpanded.value;
 };

 const shippingStatus = computed(() => {
     const stateName = order.value?.deliveries?.[0]?.stateMachineState?.translated?.name;
     return stateName ? { name: stateName } : null;
 });


 const dateFormat = 'MM/DD/YYYY';
 const formattedOrderDate = computed(() => {
     if (order.value?.orderDate) {
         return useDateFormat(order.value.orderDate, dateFormat, {
             locales: (typeof navigator !== 'undefined' && navigator.language) || 'en-US',
         });
     }
     return '';
 });

 onMounted(async () => {
     await loadOrderDetails();
 });
</script>

<template>
    <div class="rounded-lg bg-white shadow-md">
        <div class="p-4 mt-4">
            <div class="flex mt-4 ">
                <div class="text-4xl font-bold">{{ formattedOrderDate }}</div>
                <div v-if="status"
                     class="ml-4 bg-status-info text-white px-4 py-2 rounded-full">
                    {{ status }}
                </div>
            </div>
            <div class=" lg:flex gap-12">
                <AccountOrderItemInfo title="Payment" :state="paymentState" />
                <AccountOrderItemInfo title="Payment Method" :state="paymentMethod" />
                <AccountOrderItemInfo title="Shipping" :state="shippingStatus" />
                <AccountOrderItemInfo title="Shipping Method" :state="shippingMethod" />
                <div class="flex-grow"></div>
                <button @click="toggleExpanded" class="text-blue-500 underline">
                    {{ isExpanded ? 'Hide Details' : 'Show Details' }}
                </button>
            </div>
        </div>
        <div v-if="isExpanded">
            <div class="mt-4 p-4">
                <div class="font-bold mt-5">Products</div>
                <div v-for="(product, index) in order.lineItems" :key="product.id">
                    <OrderLineItem :is-account-order-item="true" :line-item="product" />
                    <hr v-if="index !== order.lineItems.length - 1" class="w-full">
                </div>
            </div>
            <OrderSummary
                :is-account-order-item="true"
                :order="order"
            />
        </div>
    </div>
</template>
