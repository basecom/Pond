<script setup lang="ts">
import type { RecoverPasswordForm } from '~/types/form/PasswordForm';

const customerStore = useCustomerStore();
const { query } = useRoute();
const { t } = useI18n();
const { pushSuccess, pushError } = useNotifications();
const hashIsValid = ref(true);

onMounted(async () => {
    try {
        const hash = Array.isArray(query.hash) ? query.hash[0] : query.hash;
        if (!hash) {
            hashIsValid.value = false;
            return;
        }

        const response = await customerStore.isRecoveryHashValid({ hash });
        hashIsValid.value = !response.isExpired;
    } catch (error) {
        hashIsValid.value = false;
    }
});

const handlePasswordChange = async (fields: RecoverPasswordForm) => {
    try {
        const hash = Array.isArray(query.hash) ? query.hash[0] : query.hash;
        if (!hash) {
            pushError(t('account.recoverPassword.recover.errorMessage'));
            return;
        }

        await customerStore.recoverPassword({
            hash,
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
        <p class="text-center text-status-danger">
            {{ $t('account.recoverPassword.recover.linkNotValid') }}
        </p>

        <LocaleLink to="/account/recover">
            <FormKit
                type="submit"
                :classes="{
                    outer: 'm-auto mt-4 w-1/2',
                }"
            >
                {{ $t('account.recoverPassword.recover.requestNewLink') }}
            </FormKit>
        </LocaleLink>
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
        <h5>
            {{ $t('account.recoverPassword.recover.heading') }}
        </h5>

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
