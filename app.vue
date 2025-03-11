<script setup>
const { locale } = useI18n();
const url = useRequestURL();
const route = useRoute();

const configStore = useConfigStore();
await configStore.loadConfig();
const shopName = configStore.get('core.basicInformation.shopName');

useHead(() => ({
    title: shopName ?? '',
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
