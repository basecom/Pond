<script setup lang="ts">
const customerStore = useCustomerStore();
const { refreshCart } = useCart();
const { loading } = storeToRefs(customerStore);
useNotifications();
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath()
const context = useSessionContext();
console.log(context);

customerStore.refreshContext();
refreshCart();
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

            <NuxtLink v-for="locale in locales" :key="locale.code" :to="switchLocalePath(locale.code)">{{
                    locale.code
                }}</NuxtLink>
        </div>
        {{locale}} - {{ $t('account.personalData.deliveryAddress') }}
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
