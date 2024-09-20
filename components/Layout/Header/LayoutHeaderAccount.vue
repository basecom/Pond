<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const modalController = useModal();
</script>

<template>
    <LazySharedModal
        v-if="!signedIn"
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
            <AccountLoginRegisterTabs />
        </template>
    </LazySharedModal>
    <LazySharedPopover v-else>
        <template #trigger>
            <FormKitIcon
                class="block h-6 w-6"
                icon="user"
                @click="!signedIn ? modalController.open() : null"
            />
        </template>
        <template #content>
            <div class="py-2 first:pt-0">
                <NuxtLink to="/account">{{ $t('account.overview.heading') }}</NuxtLink>
            </div>
            <FormKit
                type="submit"
                prefix-icon="right-from-bracket"
                @click.prevent="customerStore.logout()"
            >
                {{ $t('account.logout.buttonLabel') }}
            </FormKit>
        </template>
    </LazySharedPopover>
</template>
