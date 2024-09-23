<script setup lang="ts">
const { isAcceptAllEnabled, denyAll, acceptAll } = useCookieBannerStore();
</script>

<template>
    <div class="flex gap-2">
        <button
            class="cursor-pointer rounded-md bg-brand-primary px-4 py-2 text-white"
            @click="denyAll()"
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
            @click="acceptAll()"
        >
            {{ $t('cookie.banner.allowAllButton') }}
        </button>
    </div>
</template>

<style scoped></style>
