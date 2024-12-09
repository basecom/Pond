<script setup lang="ts">
import type { FormkitFields } from '~/types/formkit';

const customerStore = useCustomerStore();
const { query } = useRoute();
const { t } = useI18n();
const { pushSuccess, pushError } = useNotifications();
const hashIsValid = ref(true);

onMounted(async () => {
    try {
        const response = await customerStore.isRecoveryHashValid({ hash: query.hash });
        hashIsValid.value = !response.isExpired;
    } catch (error) {
        hashIsValid.value = false;
    }
});

const handlePasswordChange = async (fields: FormkitFields) => {
    try {
        await customerStore.recoverPassword({
            hash: query.hash,
            ...fields,
        });
        pushSuccess(t('account.recoverPassword.recover.successMessage'));
        navigateTo('/account/login');
    } catch (error) {
        pushError(t('account.recoverPassword.recover.errorMessage'));
    }
};
</script>

<template>
    <template v-if="!hashIsValid">
        <p class="text-center text-status-danger">{{ $t('account.recoverPassword.recover.linkNotValid') }}</p>
        <FormattedLink
            to="/account/recover"
            class="m-auto mt-4 flex w-1/2 items-center justify-center rounded bg-brand-primary px-4 py-2 text-white hover:bg-brand-primary-dark"
        >
            {{ $t('account.recoverPassword.recover.requestNewLink') }}
        </FormattedLink>
    </template>

    <FormKit
        v-else
        type="form"
        :submit-label="$t('account.recoverPassword.recover.submitLabel')"
        :classes="{
            form: 'w-full flex flex-wrap flex-col gap-4',
            actions: 'w-full',
        }"
        @submit="handlePasswordChange"
    >
        <h5>{{ $t('account.recoverPassword.recover.heading') }}</h5>
        <FormKit
            type="password"
            :label="$t('account.recoverPassword.recover.passwordLabel')"
            name="newPassword"
            :placeholder="$t('account.login.email.placeholder')"
            validation="required|length:8"
        />

        <FormKit
            type="password"
            :label="$t('account.recoverPassword.recover.confirmLabel')"
            name="newPasswordConfirm"
            :placeholder="$t('account.login.email.placeholder')"
            validation="required|confirm:newPassword"
        />
    </FormKit>
</template>
