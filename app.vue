<script setup>
const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

useHead(() => ({
    htmlAttrs: {
        lang: locale,
    },
    link: [
        {
            rel: 'canonical',
            href: runtimeConfig.public.pond.shopwareEndpoint + route.path,
        },
    ],
}));
</script>

<template>
    <NuxtLayout />
</template>
