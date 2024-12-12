<script setup lang="ts">
// Synchronize the back-end language with the front-end language. This resolves mismatches that can occur, for example,
// when the language is manually changed in the URL.
const { changeLanguage, getLanguageCodeFromId, getLanguageIdFromCode } = useInternationalization();
const { locale } = useI18n();
const { languageIdChain, refreshSessionContext } = useSessionContext();

watchEffect(async () => {
    if (languageIdChain.value) {
        const frontendLocale = locale.value;
        const backendLocale = getLanguageCodeFromId(languageIdChain.value);

        if (frontendLocale !== backendLocale) {
            await changeLanguage(getLanguageIdFromCode(frontendLocale));
            await refreshSessionContext();
            window.location.reload();
        }
    }
});

const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);

const configStore = useConfigStore();
await configStore.loadConfig();

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

    <main v-show="!loading">
        <LayoutBreadcrumbs />
        <NuxtPage />
    </main>

    <LayoutFooter v-show="!loading" />
    <CookieBanner />
</template>
