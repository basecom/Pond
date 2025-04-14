<script setup lang="ts">
const { formatLink } = useInternationalization();
const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);

const accountLinks: {name: string, link: string}[] = [
    {
        name: 'account',
        link: '/account',
    },
    {
        name: 'profile',
        link: '/account/profile',
    },
    {
        name: 'address',
        link: '/account/address',
    },
    {
        name: 'payment',
        link: '/account/payment',
    },
    {
        name: 'order',
        link: '/account/order',
    },
    {
        name: 'wishlist',
        link: '/account/wishlist',
    },
];

const logout = async () => {
    await customerStore.logout();
    navigateTo(formatLink('/'));
};
</script>

<template>
    <AccountMenuInner :account-links="accountLinks" :customer="customer" @logout="logout" />
</template>
