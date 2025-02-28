<script setup lang="ts">
const { changeLanguage, getLanguageIdFromCode, getAvailableLanguages } = useInternationalization();
const { locale } = useI18n();

const updateSessionWithLanguage = async () => {
    const frontendLocale = locale.value;
    await getAvailableLanguages();
    await changeLanguage(getLanguageIdFromCode(frontendLocale));
};

await updateSessionWithLanguage();

const { refreshCart } = useCart();
const { getWishlistProducts } = useWishlist();

useNotifications();
useBreadcrumbs();

refreshCart();
getWishlistProducts();
</script>

<template>
    <NuxtLoadingIndicator class="!bg-brand-primary !bg-none" />
    <NuxtRouteAnnouncer />

    <LayoutHeader />

    <main>
        <NuxtPage />
    </main>
</template>
