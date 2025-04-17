<script setup lang="ts">
const cookieBannerStore = useCookieBannerStore();
const analyticsStore = useAnalytics();
const { showCookieBanner, activatedCookies } = storeToRefs(cookieBannerStore);

cookieBannerStore.$onAction(({ name, after }) => {
    const actionsThatUpdateCookies = ['updateCookies', 'denyAll', 'acceptAll', 'initializeCookies'];
    if (!actionsThatUpdateCookies.includes(name)) return;

    after(() => {
        analyticsStore.updateConsent(activatedCookies.value);
    });
});

cookieBannerStore.initializeCookies();
</script>

<template>
    <div
        v-if="showCookieBanner"
        class="fixed bottom-0 z-50 flex w-full border-t-2 border-gray-dark bg-white p-2 text-xs"
    >
        <div class="container mx-auto flex flex-col items-center justify-between gap-4 text-center lg:flex-row">
            <CookieBannerMessage />
            <CookieBannerActions />
        </div>
    </div>
</template>
