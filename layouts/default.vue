<script setup lang="ts">
const customerStore = useCustomerStore();
const { refreshCart } = useCart();
const { loading } = storeToRefs(customerStore);
useNotifications();
useBreadcrumbs();

customerStore.refreshContext();
refreshCart();
</script>

<template>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <LoadingSpinner v-if="loading" />

    <Header v-show="!loading" />

    <NotificationContainer />

    <main
        v-show="!loading"
        class="mt-4 w-screen"
    >
        <UtilityBreadcrumbs />

        <NuxtPage />
    </main>

    <Footer v-show="!loading" />
</template>

<style>
#__nuxt {
    @apply grid min-h-screen grid-rows-[auto_1fr_auto];
}

.nuxt-loading-indicator {
    @apply !bg-brand-primary !bg-none;
}
</style>
