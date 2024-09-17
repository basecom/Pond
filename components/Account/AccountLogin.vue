<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { ResolvedApiError } from '~/types/errors';

type FormkitLoginFields = {
    username: string;
    password: string;
};

const props = withDefaults(
    defineProps<{
        redirectAfterSuccess?: boolean;
        redirectTarget?: string;
        showCreateLink?: boolean;
    }>(),
    {
        redirectAfterSuccess: false,
        redirectTarget: '/account',
        showCreateLink: true,
    },
);

const customerStore = useCustomerStore();
const { togglePasswordVisibility } = useFormkitHelper();
const { resolveApiErrors } = useApiErrorsResolver();
const { signedIn } = storeToRefs(customerStore);
const apiErrors = ref<ResolvedApiError[]>([]);
const { pushError, pushSuccess } = useNotifications();
const { mergeWishlistProducts } = useWishlist();

const handleLogin = async (fields: FormkitLoginFields) => {
    try {
        await customerStore.login({
            ...fields,
        });

        if (props.redirectAfterSuccess) {
            navigateTo(props.redirectTarget);
        }
        mergeWishlistProducts();
        pushSuccess('You successfully logged in.');
    } catch (error) {
        pushError('An error occured trying to login. Please try again.');

        if (error instanceof ApiClientError) {
            apiErrors.value = resolveApiErrors(error.details.errors, 'login');
            return;
        }

        apiErrors.value.push({ key: 'login', code: 'LOGIN_GENERAL_ERROR' });
    }
};
</script>

<template>
    <FormKit
        v-if="!signedIn"
        type="form"
        submit-label="login"
        :classes="{
            form: 'w-full flex flex-wrap flex-col gap-4',
            actions: 'w-full',
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

        <NuxtLink
            v-if="showCreateLink"
            :to="{ name: 'account-register' }"
            >create account here</NuxtLink
        >
    </FormKit>
</template>
