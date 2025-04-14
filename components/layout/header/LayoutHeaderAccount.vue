<script setup lang="ts">
const { formatLink } = useInternationalization();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const logout = async () => {
    await customerStore.logout();
    navigateTo(formatLink('/'));
};
</script>

<template>
    <LayoutHeaderAccountInner :signed-in="signedIn" @logout="logout" />
</template>
