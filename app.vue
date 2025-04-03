<script setup>
const { locale } = useI18n();
const url = useRequestURL();
const route = useRoute();

useHead(() => ({
    htmlAttrs: {
        lang: locale,
    },
    link: [
        {
            rel: 'canonical',
            href: url.origin + route.path,
        },
        {
            rel: 'alternate',
            hreflang: locale ?? 'x-default',
            href: url.origin + route.path,
        },
    ],
}));
</script>

<template>
    <NuxtLayout />
</template>
