<script setup lang="ts">
const customerStore = useCustomerStore();
const customerId = computed(() => customerStore.customer?.id);
const { orders, loadOrders } = useCustomerOrders();

watch(customerId, async newId => {
    if (newId) {
        await loadOrders({ customerId: newId });
    }
});

onMounted(async () => {
    if (customerId.value) {
        await loadOrders({ customerId: customerId.value });
    }
});
</script>

<template>
    <div>
        <h1 class="mb-2 font-bold">Orders</h1>
        <ul v-if="orders.length > 0">
            <li
                v-for="order in orders"
                :key="order.id"
            >
                <SharedAccordionRoot class="rounded-lg shadow-lg">
                    <AccountOrderItem :order-id="order.id" />
                </SharedAccordionRoot>
            </li>
        </ul>
        <p v-else>Oops, no orders have been found. Have you placed an order yet?</p>
    </div>
</template>
