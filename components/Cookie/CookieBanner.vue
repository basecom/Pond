<script setup lang="ts">
const cookieBannerStore = useCookieBannerStore();
const { showCookieBanner } = storeToRefs(cookieBannerStore);

// onMounted(() => {
    cookieBannerStore.initializeCookies();
// });
</script>

<template>
    <div
        v-if="showCookieBanner"
        class="fixed bottom-0 z-50 flex w-full border-t-2 border-gray-dark bg-white p-2 text-xs md:flex-col"
    >
        <div class="container mx-auto flex flex-col items-center justify-between text-center md:flex-row">
            <CookieBannerMessage />
            <CookieBannerActions />
        </div>
    </div>
</template>
