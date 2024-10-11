<script setup lang="ts">
import type { FormkitFields } from '~/types/formkit';
import { ApiClientError } from '@shopware/api-client';
import { useFormErrorStore } from '~/stores/FormErrorStore';

const customerStore = useCustomerStore();
const { errorOfField, togglePasswordVisibility } = useFormkitHelper();
const formErrorStore = useFormErrorStore();

const isLoading = ref(false);

const handleRegisterSubmit = async (fields: FormkitFields) => {
    isLoading.value = true;
    try {
        await customerStore.register({
            ...fields,
        });
        isLoading.value = false;
        navigateTo('/account');
    } catch (error) {
        isLoading.value = false;

        if (error instanceof ApiClientError) {
            formErrorStore.formErrors(error.details.errors);
            return;
        }

        formErrorStore.apiErrors.value.push({ key: 'register', code: 'REGISTER_GENERAL_ERROR' });
    }
};
</script>

<template>
    <FormKit
        type="form"
        :submit-label="$t('account.register.submitLabel')"
        :classes="{
            form: 'grid grid-cols-2 gap-3 w-full max-w-md',
        }"
        :config="{
            validationVisibility: 'dirty',
        }"
        :actions="false"
        @submit="handleRegisterSubmit"
    >
        <ul
            v-if="formErrorStore.apiErrors.filter(error => error.key === 'register').length"
            class="validation-errors text-status-danger"
        >
            <li
                v-for="(error, index) in formErrorStore.apiErrors.filter(error => error.key === 'register')"
                :key="`login-error-${index}`"
            >
                {{ error.code }}
            </li>
        </ul>

        <div class="col-span-2">
            <span>{{ $t('account.register.addressHeading') }}</span>
        </div>

        <AddressFormFields />

        <div class="col-span-2">
            <span>{{ $t('account.register.accountDataHeading') }}</span>
        </div>

        <FormKit
            type="email"
            :label="$t('account.register.email.label')"
            name="email"
            :placeholder="$t('account.register.email.placeholder')"
            :errors="errorOfField('email', formErrorStore.apiErrors)"
            validation="required"
        />

        <FormKit
            type="password"
            :label="$t('account.register.password.label')"
            name="password"
            :placeholder="$t('account.register.password.placeholder')"
            :errors="errorOfField('password', formErrorStore.apiErrors)"
            validation="required"
            suffix-icon="lock"
            @suffix-icon-click="togglePasswordVisibility"
        />

        <FormKit
            type="checkbox"
            :label="$t('account.register.terms.label')"
            :help="$t('account.register.terms.help')"
            name="terms"
            :value="false"
            decorator-icon="check"
            validation="accepted"
        />

        <FormKit
            type="submit"
            :classes="{
                outer: 'col-span-2 relative',
            }"
            :disabled="isLoading"
        >
            <span
                class="formkit-label"
                :class="{
                    'opacity-0': isLoading,
                }"
            >
                {{ $t('account.register.submitLabel') }}
            </span>
            <UtilityLoadingSpinner
                v-if="isLoading"
                size="small"
            />
        </FormKit>
    </FormKit>
</template>
