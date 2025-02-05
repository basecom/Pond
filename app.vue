<script setup>
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

useHead(() => ({
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
