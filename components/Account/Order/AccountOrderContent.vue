<script setup lang="ts">
import AccountOrderItem from '~/components/Account/Order/AccountOrderItem.vue';

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
        <ul>
            <li
                v-for="order in orders"
                :key="order.id"
            >
                <SharedAccordionRoot class="rounded-lg shadow-lg">
                    <AccountOrderItem :order-id="order.id" />
                </SharedAccordionRoot>
            </li>
        </ul>
    </div>
</template>
