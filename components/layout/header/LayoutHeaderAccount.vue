<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const logout = async () => {
    await customerStore.logout();
    navigateTo('/');
};
</script>

<template>
    <LayoutHeaderAccountInner :signed-in="signedIn" @logout="logout" />
</template>
