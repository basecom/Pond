<script setup lang="ts">
const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);

const accountLinks: {name: string, link: string}[] = [
    {
        name: 'overview.label',
        link: '/account',
    },
    {
        name: 'personalProfile',
        link: '/account/profile',
    },
    {
        name: 'addresses',
        link: '/account/address',
    },
    {
        name: 'paymentMethods',
        link: '/account/payment',
    },
    {
        name: 'orders',
        link: '/account/order',
    },
    {
        name: 'wishlist',
        link: '/account/wishlist',
    },
];

const logout = async () => {
    await customerStore.logout();
    navigateTo('/');
};
</script>

<template>
    <AccountMenuInner :account-links="accountLinks" :customer="customer" @logout="logout" />
</template>
