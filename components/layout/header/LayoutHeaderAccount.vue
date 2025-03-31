<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
</script>

<template>
    <LayoutHeaderAccountInner :signed-in="signedIn" />
</template>
