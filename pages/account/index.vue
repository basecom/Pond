<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

if (!signedIn) {
    navigateTo('/');
}
</script>

<template>Account</template>

<style scoped></style>
