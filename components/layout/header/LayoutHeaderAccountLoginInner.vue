<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
</script>

<template>
    <UiDialogContent>
        <UiDialogHeader>
            <UiDialogTitle>
                {{ $t('account.auth.login') }}
            </UiDialogTitle>
        </UiDialogHeader>

        <UiDialogFooter>
            <UiButton>
              {{ $t('account.auth.login') }}
            </UiButton>
        </UiDialogFooter>
    </UiDialogContent>
</template>
