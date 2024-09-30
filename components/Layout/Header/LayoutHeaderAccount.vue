<script setup lang="ts">
const modal = ref(null);
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const closeModal = () => {
    modal.value.close();
};
</script>

<template>
    <LazySharedModal
        v-if="!signedIn"
        ref="modal"
        :with-close-button="true"
    >
        <template #trigger>
            <FormKitIcon
                class="block h-6 w-6"
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
                class="block h-6 w-6"
                icon="user"
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
