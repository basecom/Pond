<script setup lang="ts">
const modalController = useModal();
</script>

<template>
    <div>
        <LazySharedModal
            :with-close-button="true"
            :controller="modalController"
        >
            <template #trigger>
                <FormKitIcon
                    class="block p-2 bg-brand-primary w-9 h-9 rounded-full cursor-pointer text-white"
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
    </div>
</template>
