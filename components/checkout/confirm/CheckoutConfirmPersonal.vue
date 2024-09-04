<script setup lang="ts">
const customerStore = useCustomerStore();
</script>

<template>
    <CheckoutConfirmCard title="Personal Information">
        <span
            v-if="customerStore.customer"
            class="text-sm"
        >
            You are logged in as {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }} (is guest: {{ customerStore.customer.guest}})
        </span>

        <template v-else>
            <AccountLoginRegisterTabs />
        </template>
    </CheckoutConfirmCard>
</template>
