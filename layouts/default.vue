<script setup lang="ts">
const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);
const { notifications } = useNotifications();

customerStore.refreshContext();
</script>

<template>
    <NuxtRouteAnnouncer />
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader v-show="!loading" />

    <ToastProvider>
        <UtilityToastNotifications :key="notifications.length" />
    </ToastProvider>

    <main
        v-show="!loading"
        class="mt-4"
    >
        <NuxtPage />
    </main>

    <LayoutFooter v-show="!loading" />
</template>

<style>
#__nuxt {
    @apply grid min-h-screen;
}
</style>
