<script setup>
const { locale } = useI18n();

useHead({
    htmlAttrs: {
        lang: locale
    }
})
</script>

<template>
    <NuxtLayout />
</template>
