<script setup lang="ts">
import type { ResetPasswordForm } from '~/types/form/PasswordForm';

const customerStore = useCustomerStore();
const { getStorefrontUrl } = useInternationalization();
const formSent = ref(false);

const handleReset = async (fields: ResetPasswordForm) => {
    try {
        await customerStore.resetPassword({
            ...fields,
            storefrontUrl: getStorefrontUrl(),
        });
    } catch (error) {
        // we won't do anything here because we don't want the user to know if the email is registered
    } finally {
        formSent.value = true;
    }
};
</script>

<template>
    <h3 class="mb-4">
        {{ $t('account.recoverPassword.request.heading') }}
    </h3>

    <FormKit
        v-if="!formSent"
        type="form"
        :submit-label="$t('account.recoverPassword.request.submitLabel')"
        :classes="{
            form: 'w-full flex flex-wrap flex-col gap-4',
            actions: 'w-full',
        }"
        @submit="handleReset"
    >
        <p class="text-sm">
            {{ $t('account.recoverPassword.request.subHeading') }}
        </p>

        <FormKit
            type="email"
            :label="$t('account.login.email.label')"
            name="email"
            :placeholder="$t('account.login.email.placeholder')"
            validation="required|email"
        />
    </FormKit>

    <template v-if="formSent">
        <p>
            {{ $t('account.recoverPassword.request.successMessage') }}
        </p>

        <LocaleLink to="/account/login">
            <FormKit
                type="submit"
                :classes="{
                    outer: 'mt-4',
                }"
            >
                {{ $t('account.recoverPassword.request.loginButtonLabel') }}
            </FormKit>
        </LocaleLink>
    </template>
</template>
