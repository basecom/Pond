<script setup lang="ts">
const customerStore = useCustomerStore();
const customerId = computed(() => customerStore.customer?.id);
const { orders, loadOrders } = useCustomerOrders();

const isLoading = ref(false);

watch(customerId, async newId => {
    if (newId) {
        isLoading.value = true;
        await loadOrders({ customerId: newId });
        isLoading.value = false;
    }
});

onMounted(async () => {
    if (customerId.value) {
        isLoading.value = true;
        await loadOrders({ customerId: customerId.value });
        isLoading.value = false;
    }
});
</script>

<template>
    <div>
        <h1 class="mb-2 font-bold">
            {{ $t('account.orders.heading') }}
        </h1>

        <div
            v-if="isLoading"
            class="relative h-20"
        >
            <UtilityLoadingSpinner class="bg-white opacity-50" />
        </div>

        <ul v-if="orders.length > 0 && !isLoading" class="divide-brand-primary divide-y-2">
            <li
                v-for="order in orders"
                :key="order.id"
            >
                <SharedAccordionRoot class="rounded-lg shadow-lg">
                    <AccountOrderItem :order-id="order.id" />
                </SharedAccordionRoot>
            </li>
        </ul>

        <p v-else-if="!isLoading">
            {{ $t('account.orders.noOrdersFound') }}
        </p>
    </div>
</template>
