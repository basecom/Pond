<script setup lang="ts">
const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);
</script>

<template>
    <AccountOverviewInner v-if="customer" :customer="customer" />
</template>
