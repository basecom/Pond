<script setup lang="ts">
const cookieBannerStore = useCookieBannerStore();
const { isAcceptAllEnabled } = storeToRefs(cookieBannerStore);
</script>

<template>
    <div class="flex gap-2">
        <button
            class="cursor-pointer rounded-md bg-brand-primary px-4 py-2 text-white"
            @click="cookieBannerStore.denyAll()"
        >
            {{ $t('cookie.banner.denyAllButton') }}
        </button>
        <CookieBannerModal>
            <template #trigger>
                <button class="cursor-pointer rounded-md bg-brand-primary px-4 py-2 text-white">
                    {{ $t('cookie.banner.configureButton') }}
                </button>
            </template>
        </CookieBannerModal>
        <button
            v-if="isAcceptAllEnabled"
            class="cursor-pointer rounded-md bg-brand-primary px-4 py-2 text-white"
            @click="cookieBannerStore.acceptAll()"
        >
            {{ $t('cookie.banner.allowAllButton') }}
        </button>
    </div>
</template>
