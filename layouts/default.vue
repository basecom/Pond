<script setup lang="ts">
const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);

customerStore.refreshContext();
</script>

<template>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader v-show="!loading" />

    <main
        v-show="!loading"
        class="mt-4 w-screen"
    >
        <NuxtPage />
    </main>

    <LayoutFooter v-show="!loading" />
</template>

<style>
#__nuxt {
    @apply grid min-h-screen;
}

.nuxt-loading-indicator {
    @apply !bg-brand-primary !bg-none;
}
</style>
