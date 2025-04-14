<script setup lang="ts">
const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);
</script>

<template>
    <AccountPageOverviewInner v-if="customer" :customer="customer" />
</template>
