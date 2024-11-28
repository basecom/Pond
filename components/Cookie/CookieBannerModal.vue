<script setup lang="ts">
const modalController = useModal();
</script>

<template>
    <LazySharedModal
        :with-close-button="true"
        :controller="modalController"
    >
        <template #trigger>
            <FormKitIcon
                class="block h-9 w-9 cursor-pointer rounded-full bg-brand-primary p-2 text-white"
                icon="cookie"
            />
        </template>
        <template #title>{{ $t('cookie.modal.title') }}</template>
        <template #content>
            <CookieBannerConfiguration
                @update-cookies="modalController.close()"
                @deny-all="modalController.close()"
                @accept-all="modalController.close()"
            />
        </template>
    </LazySharedModal>
</template>
