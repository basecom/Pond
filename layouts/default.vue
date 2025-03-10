<script setup lang="ts">

const { changeLanguage, getLanguageIdFromCode } = useInternationalization();
const { locale } = useI18n();
const configStore = useConfigStore();
const contextStore = useContextStore();
const cartStore = useCartStore();
const navigationStore = useNavigationStore();
const { loading } = storeToRefs(contextStore);
const { getWishlistProducts } = useWishlist();
const route = useRoute();
const frontendLocale = locale.value;

if (import.meta.server) {
    await contextStore.getAllLanguages();
    const localLanguageId = getLanguageIdFromCode(frontendLocale);
    await changeLanguage(localLanguageId);
    await contextStore.refreshSessionContext();
    await Promise.all([
        configStore.loadConfig(),
        navigationStore.loadMainNavigation(2),
    ]);
    cartStore.refreshCart();
} else {
    contextStore.reloadSessionContextFromSsr();
    contextStore.reloadLanguagesFromSsr();
    cartStore.reloadCartFromSsr();
}

const isWishlistPage = route.path === '/wishlist';
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');
const shopName = configStore.get('core.basicInformation.shopName') as string|null;

if (!isWishlistPage && wishlistEnabled) {
    // If not on wishlist page we fetch for displaying the amount of items in the header
    getWishlistProducts();
}

useNotifications();
useBreadcrumbs();
useHead({
    title: shopName ?? '',
    htmlAttrs: {
        lang: locale.value,
    },
});
</script>

<template>
    <NuxtLoadingIndicator class="!bg-brand-primary !bg-none" />
    <NuxtRouteAnnouncer />
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader v-show="!loading" />
    <UtilityToastNotifications />

    <main v-show="!loading">
        <LayoutBreadcrumbs />
        <NuxtPage class="mt-4 lg:mt-0" />
    </main>

    <LayoutFooter v-show="!loading" />
    <CookieBanner />
</template>
