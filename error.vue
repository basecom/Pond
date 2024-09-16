<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();
const { locale, locales, setLocale } = useI18n();
const context = useShopwareContext();
console.log(context);
</script>

<template>
    <div class="container flex flex-col items-center justify-center">

        <button @click="setLocale('en-GB')">en</button>
        <button @click="setLocale('de-DE')">de</button>
        <p>{{ $t('welcome') }}</p>
        <h1>{{ error.statusCode }} - {{ error.message }}</h1>
        <NuxtLink
            class="inline-flex max-w-56 items-center justify-center bg-brand-primary px-4 py-2 text-center text-white hover:bg-brand-primary-dark"
            :to="{ name: 'index' }"
        >
            Homepage
        </NuxtLink>
    </div>
</template>
