<script setup lang="ts">
const { changeLanguage, getLanguageIdFromCode, getAvailableLanguages } = useInternationalization();
const { locale } = useI18n();
const url = useRequestURL();
const route = useRoute();

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

const configStore = useConfigStore();
await configStore.loadConfig();
const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';

useHead(() => ({
    title: shopName,
    htmlAttrs: {
        lang: locale.value,
    },
    link: [
        {
            rel: 'canonical',
            href: url.origin + route.path,
        },
    ],
}));
</script>

<template>
    <NuxtLayout />
</template>
