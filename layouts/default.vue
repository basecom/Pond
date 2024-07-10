<script setup lang="ts">
const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);

customerStore.refreshContext();
</script>

<template>
    <NuxtRouteAnnouncer />
    <UtilityLoadingSpinner v-if="loading" />

    <!-- layout header -->

    <main v-show="!loading" class="container mt-4">
        <NuxtPage />
    </main>

    <LayoutFooter v-show="!loading" />
</template>

<style>
#__nuxt {
    @apply grid min-h-screen;
}
</style>
