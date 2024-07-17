<script setup lang="ts">
import { useFormkitHelper } from '~/composables/useFormkitHelper';
import { ApiClientError } from '@shopware/api-client';
import type { ResolvedApiError } from '~/types/errors';
import { useApiErrorsResolver } from '~/composables/useApiErrorsResolver';

type FormkitLoginFields = {
    username: string;
    password: string;
};

const customerStore = useCustomerStore();

const { togglePasswordVisibility } = useFormkitHelper();
const { resolveApiErrors } = useApiErrorsResolver();

const { signedIn } = storeToRefs(customerStore);
const apiErrors = ref<ResolvedApiError[]>([]);

const handleLogin = async (fields: FormkitLoginFields) => {
    try {
        await customerStore.login({
            ...fields,
        });
        navigateTo('/account');
    } catch (error) {
        if (error instanceof ApiClientError) {
            apiErrors.value = resolveApiErrors(error.details.errors, 'login');
        }
    }
};
</script>

<template>
    <FormKit
        v-if="!signedIn"
        type="form"
        submit-label="login"
        :classes="{
            form: 'w-full max-w-xs',
        }"
        @submit="handleLogin"
    >
        <ul
            v-if="apiErrors.length"
            class="validation-errors text-status-danger"
        >
            <li
                v-for="(error, index) in apiErrors"
                :key="`login-error-${index}`"
            >
                {{ error.code }}
            </li>
        </ul>
        <FormKit
            type="email"
            label="email"
            name="username"
            placeholder="quack@platsch.com"
            help="your email address"
        />
        <FormKit
            type="password"
            label="password"
            name="password"
            suffix-icon="lock"
            @suffix-icon-click="togglePasswordVisibility"
        />
        <NuxtLink :to="{ name: 'account-register' }">create account here</NuxtLink>
    </FormKit>
</template>
