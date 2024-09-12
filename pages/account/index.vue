<script setup lang="ts">

const customerStore = useCustomerStore();

const handleLogout = async () => {
    await customerStore.logout();
    navigateTo('/');
};
</script>

<template>
    <div class="container flex w-full">
        <AccountSideNavigation
        class="mr-32 hidden lg:block"
        :is-in-header="false"
        />
        <div class="flex-grow">
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
    </div>
</template>
