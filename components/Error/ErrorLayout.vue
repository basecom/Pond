<script setup lang="ts">
const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);
const { refreshCart } = useCart();

customerStore.refreshContext();
refreshCart();
</script>

<template>
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader v-show="!loading" />

    <main class="container flex flex-col items-center justify-center mt-4 md:mt-10" v-show="!loading">
        <slot name="content" />
    </main>

    <LayoutFooter v-show="!loading" />
</template>