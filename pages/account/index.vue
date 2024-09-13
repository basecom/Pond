<script setup lang="ts">
const customerStore = useCustomerStore();

const handleLogout = async () => {
    await customerStore.logout();
    navigateTo('/');
};

useBreadcrumbs([
    // TODO: Replace with dynamic home page name
    {
        name: 'Startseite',
        path: '/'
    },
    {
        name: "Account",
        path: "/account",
    },
]);
</script>

<template>
    <div class="container">
        <h1>Account</h1>
        <template v-if="customerStore.customer">
            hi {{ customerStore.customer.firstName }} {{ customerStore.customer.lastName }}
        </template>
        <FormKit
            type="submit"
            prefix-icon="right-from-bracket"
            @click.prevent="handleLogout"
        >
            logout
        </FormKit>
    </div>
</template>
