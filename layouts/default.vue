<script setup lang="ts">
const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);

customerStore.refreshContext();
</script>

<template>
    <NuxtRouteAnnouncer />
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader />

    <main v-show="!loading" class="container mt-4">
        <NuxtPage />
    </main>

    <footer v-show="!loading" class="p-5">
        <p>Pond. Hier kommt ein Footer hin</p>
    </footer>
</template>
