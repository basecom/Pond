<script setup lang="ts">
const customerStore = useCustomerStore();
</script>

<template>
    <CheckoutConfirmCard title="Personal Information">
        <span
            v-if="customerStore.customer"
            class="text-sm"
        >
            You are logged in as {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}
            <UtilityPill
                v-if="customerStore.customer.guest"
                content="guest"
                class="px-1.5"
            />
        </span>

        <template v-else>
            <AccountLoginRegisterTabs :allow-guest="true"/>
        </template>
    </CheckoutConfirmCard>
</template>
