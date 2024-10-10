<script setup lang="ts">
const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);

const { refreshCart } = useCart();
const { getWishlistProducts } = useWishlist();

useNotifications();
useBreadcrumbs();

customerStore.refreshContext();
refreshCart();

const route = useRoute();
if (route.path !== '/wishlist') {
    // If not on wishlist page we fetch for displaying the amount of items in the header
    getWishlistProducts();
}
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

    <LayoutFooter v-show="!loading" />
    <CookieBanner />
</template>

<style>
#__nuxt {
    @apply grid min-h-screen grid-rows-[auto_1fr_auto];
}

.nuxt-loading-indicator {
    @apply !bg-brand-primary !bg-none;
}
</style>
