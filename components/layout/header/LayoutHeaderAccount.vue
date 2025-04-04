<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const { formatLink } = useInternationalization(localePath);

const logout = async () => {
    await customerStore.logout();
    navigateTo(formatLink('/'));
};
</script>

<template>
    <LayoutHeaderAccountInner :signed-in="signedIn" @logout="logout" />
</template>
