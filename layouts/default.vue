<script setup lang="ts">
const customerStore = useCustomerStore();
const cookieBannerStore = useCookieBannerStore();
const googleAnalyticsStore = useGoogleAnalyticsStore();
const { refreshCart } = useCart();
const { loading } = storeToRefs(customerStore);
const { activatedCookies } = storeToRefs(cookieBannerStore);
useNotifications();
useBreadcrumbs();

customerStore.refreshContext();
refreshCart();

cookieBannerStore.$onAction(({ name, after }) => {
    const actionsThatUpdateCookies = ['updateCookies', 'denyAll', 'acceptAll', 'initializeCookies'];
    if (!actionsThatUpdateCookies.includes(name)) return;

    after(() => {
        googleAnalyticsStore.updateConsent(activatedCookies.value);
    });
});
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
