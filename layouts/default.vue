<script setup lang="ts">
const customerStore = useCustomerStore();
const { refreshCart } = useCart();
const { loading } = storeToRefs(customerStore);
useNotifications();
useBreadcrumbs();

// one of the calls needs to be async for proper error catching
customerStore.refreshContext();
await refreshCart();
</script>

<template>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader v-show="!loading" />

    <UtilityToastNotifications />

    <main
        v-show="!loading"
        class="mt-4 w-screen"
    >
        <LayoutBreadcrumbs />

        <NuxtPage />
    </main>

<!--    <LayoutFooter v-show="!loading" />-->
</template>

<style>
#__nuxt {
    @apply grid min-h-screen grid-rows-[auto_1fr_auto];
}

.nuxt-loading-indicator {
    @apply !bg-brand-primary !bg-none;
}
</style>
