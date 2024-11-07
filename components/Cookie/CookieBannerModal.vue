<script setup lang="ts">
const cookieBannerStore = useCookieBannerStore();
const { activatedCookies, cookieGroups, isAcceptAllEnabled } = storeToRefs(cookieBannerStore);
const modalController = useModal();

const onUpdateCookie = (active: CookieEntry['cookie'][], inactive: CookieEntry['cookie'][]) => {
    cookieBannerStore.updateCookies(active, inactive);
    modalController.close();
};

const onAcceptAll = () => {
    cookieBannerStore.acceptAll();
    modalController.close();
};

const onDenyAll = () => {
    cookieBannerStore.denyAll();
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
                :is-accept-all-enabled="isAcceptAllEnabled"
                :cookie-groups="cookieGroups"
                :active-cookies="activatedCookies"
                @update-cookies="onUpdateCookie"
                @deny-all="onDenyAll"
                @accept-all="onAcceptAll"
            />
        </template>
    </LazySharedModal>
</template>
