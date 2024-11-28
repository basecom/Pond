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
        showRecoverLink?: boolean;
    }>(),
    {
        redirectAfterSuccess: false,
        redirectTarget: '/account',
        showCreateLink: true,
        showRecoverLink: true,
    },
);

defineEmits(['closeModal']);

const customerStore = useCustomerStore();
const { togglePasswordVisibility } = useFormkitHelper();
const { resolveApiErrors } = useApiErrorsResolver();
const { signedIn } = storeToRefs(customerStore);
const apiErrors = ref<ResolvedApiError[]>([]);
const { pushError, pushSuccess } = useNotifications();
const { mergeWishlistProducts } = useWishlist();
const { trackLogin } = useAnalytics();
const { t } = useI18n();

const handleLogin = async (fields: FormkitLoginFields) => {
    try {
        await customerStore.login({
            ...fields,
        });

        if (props.redirectAfterSuccess) {
            navigateTo(props.redirectTarget);
        }
        mergeWishlistProducts();
        trackLogin();
        pushSuccess(t('account.login.successMessage'));
    } catch (error) {
        pushError(t('account.login.errorMessage'));

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
        name="loginForm"
        :submit-label="$t('account.login.submitLabel')"
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
            :label="$t('account.login.email.label')"
            name="username"
            :placeholder="$t('account.login.email.placeholder')"
            :help="$t('account.login.email.help')"
        />

        <FormKit
            type="password"
            :label="$t('account.login.password.label')"
            name="password"
            suffix-icon="lock"
            @suffix-icon-click="togglePasswordVisibility"
        />
    </FormKit>

    <div
        v-if="!signedIn"
        class="mt-2 flex justify-between"
    >
        <NuxtLink
            v-if="showCreateLink"
            to="/account/register"
            class="hover:text-brand-primary"
        >
            {{ $t('account.login.createAccountLink') }}
        </NuxtLink>

        <NuxtLink
            v-if="showRecoverLink"
            to="/account/recover"
            class="hover:text-brand-primary"
            :class="{ 'text-right': showCreateLink }"
            @click="$emit('closeModal')"
        >
            {{ $t('account.login.recoverPasswordLink') }}
        </NuxtLink>
    </div>
</template>
