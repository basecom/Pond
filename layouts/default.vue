<script setup lang="ts">
import { awaitExpression } from '@babel/types';

const customerStore = useCustomerStore();
const { refreshCart } = useCart();
const { loading } = storeToRefs(customerStore);
useNotifications();
const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath()
const context = useShopwareContext();
console.log(context);

customerStore.refreshContext();
refreshCart();
const localeRoute = useLocaleRoute()
</script>

<template>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader v-show="!loading" />

    <UtilityToastNotifications />

    <main
        v-show="!loading"
        class="mt-4 w-screen"
    >
        <div class="flex gap-2">

<!--            <NuxtLink v-for="locale in locales" :key="locale.code" :to="switchLocalePath(locale.code)">{{-->
<!--                    locale.code-->
<!--                }}</NuxtLink>-->
            <button @click="setLocale('en-GB')">en</button>
            <button @click="setLocale('de-DE')">de</button>
            <p>{{ $t('welcome') }}</p>
        </div>
        <NuxtPage />
    </main>

    <LayoutFooter v-show="!loading" />
</template>

<style>
#__nuxt {
    @apply grid min-h-screen;
}

.nuxt-loading-indicator {
    @apply !bg-brand-primary !bg-none;
}
</style>
