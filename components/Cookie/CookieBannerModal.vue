<script setup lang="ts">
const cookieBannerStore = useCookieBannerStore();
const { activatedCookies, cookieGroups } = storeToRefs(cookieBannerStore);
const modalController = useModal();

const onUpdateCookie = (active: CookieEntry['cookie'][], inactive: CookieEntry['cookie'][]) => {
    cookieBannerStore.updateCookies(active, inactive);
    modalController.close();
};
</script>

<template>
    <LazySharedModal
        :with-close-button="true"
        :controller="modalController"
    >
        <template #trigger>
            <slot name="trigger" />
        </template>
        <template #title>{{ $t('cookie.modal.title') }}</template>
        <template #content>
            <CookieBannerConfiguration
                :cookie-groups="cookieGroups"
                :active-cookies="activatedCookies"
                @update-cookies="onUpdateCookie"
            />
        </template>
    </LazySharedModal>
</template>

<style scoped></style>
