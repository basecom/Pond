<script setup lang="ts">
const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);

const configStore = useConfigStore();
await configStore.loadConfig();
console.log('config: ', configStore.get('core.listing.productsPerPage'));

const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');

const { refreshCart } = useCart();
const { getWishlistProducts } = useWishlist();

useNotifications();
useBreadcrumbs();

customerStore.refreshContext();
refreshCart();

const route = useRoute();
if (route.path !== '/wishlist' && wishlistEnabled) {
    // If not on wishlist page we fetch for displaying the amount of items in the header
    getWishlistProducts();
}
</script>

<template>
    <NuxtLoadingIndicator class="!bg-brand-primary !bg-none" />
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
