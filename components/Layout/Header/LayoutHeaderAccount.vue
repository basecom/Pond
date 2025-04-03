<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const modalController = useModal();
const { t } = useI18n();

const closeModal = () => {
    modalController.close();
};
</script>

<template>
    <LazySharedModal
        v-if="!signedIn"
        :controller="modalController"
        :with-close-button="true"
    >
        <template #trigger>
            <FormKitIcon
                class="block size-6"
                :title="t('icon.user')"
                icon="user"
            />
        </template>
        <template #title>{{ $t('account.loginModal.heading') }}</template>
        <template #content>
            <AccountLoginRegisterTabs @close-modal="closeModal" />
        </template>
    </LazySharedModal>

    <LazySharedPopover v-else>
        <template #trigger>
            <FormKitIcon
                class="block size-6"
                icon="user"
                :title="t('icon.user')"
            />
        </template>
        <template #content>
            <AccountSideNavigation
                class="mt-4"
                :is-in-header="true"
            />
        </template>
    </LazySharedPopover>
</template>
