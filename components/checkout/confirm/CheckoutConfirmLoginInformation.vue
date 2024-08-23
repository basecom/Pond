<script setup lang="ts">
const customerStore = useCustomerStore();
</script>

<template>
    <fieldset class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6">
        <legend class="pt-5">
            <h3 class="text-lg font-medium">
                Personal Information
            </h3>
        </legend>

        <span v-if="customerStore.customer" class="text-sm">
            You are logged in as {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}
        </span>

        <template v-else>
            <AccountLoginRegisterTabs />
        </template>
    </fieldset>
</template>
