<script setup lang="ts">
const { changeLanguage, getLanguageIdFromCode, getAvailableLanguages } = useInternationalization();
const { locale } = useI18n();

const updateSessionWithLanguage = async () => {
    const frontendLocale = locale.value;
    await getAvailableLanguages();
    await changeLanguage(getLanguageIdFromCode(frontendLocale));
};

await updateSessionWithLanguage();

const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);

const configStore = useConfigStore();
await configStore.loadConfig();

const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');

const { refreshCart } = useCart();
const { getWishlistProducts } = useWishlist();

useNotifications();
useBreadcrumbs();

await customerStore.refreshContext();
refreshCart();

useBroadcastState();

const route = useRoute();
if (route.path !== '/wishlist' && wishlistEnabled) {
    // If not on wishlist page we fetch for displaying the amount of items in the header
    getWishlistProducts();
}

const shopName = configStore.get('core.basicInformation.shopName') as string|null;
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

    <main v-show="!loading" class="min-h-[calc(100Vh-140px)]">
        <LayoutBreadcrumbs />
        <NuxtPage class="mt-4 lg:mt-0" />
    </main>

    <LayoutFooter v-show="!loading" />
    <CookieBanner />
</template>
