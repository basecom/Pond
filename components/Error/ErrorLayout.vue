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

    <main
        v-show="!loading"
        class="container mt-4 flex flex-col items-center justify-center md:mt-10"
    >
        <slot />
    </main>

    <LayoutFooter v-show="!loading" />
</template>
