<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { RegisterForm } from '~/types/form/AuthenticationForm';
import type { CustomerRegisterParams } from '~/types/CustomerRegisterParams';

const props = withDefaults(
    defineProps<{
        redirectAfterSuccess?: boolean;
        redirectTarget?: string;
        showCreateLink?: boolean;
        allowGuest?: boolean;
    }>(),
    {
        redirectAfterSuccess: false,
        redirectTarget: '/account',
        showCreateLink: true,
        allowGuest: false,
    },
);

const customerStore = useCustomerStore();
const { errorOfField, togglePasswordVisibility } = useFormkitHelper();
const { pushError, pushSuccess } = useNotifications();
const formErrorStore = useFormErrorStore();
const { trackRegister } = useAnalytics();
const { t } = useI18n();
const { affiliateCode } = useAffiliateMarketing();

const isLoading = ref(false);
const orderAsGuest = ref(false);

const handleRegisterSubmit = async (fields: RegisterForm) => {
    isLoading.value = true;

    const userData : CustomerRegisterParams  = fields.alternativeShippingAddress.showAlternativeShippingAddress
        ? {
            ...fields,
            shippingAddress: {
                ...fields.alternativeShippingAddress,
                ...fields.alternativeShippingAddress?.shippingAddress,
            },
        }
        : {
            ...fields,
        };

    if (affiliateCode.value) {
        userData['affiliateCode'] = `${affiliateCode.value}`;
    }

    try {
        await customerStore.register({
            ...userData,
        });

        await customerStore.refreshContext();

        isLoading.value = false;

        trackRegister();

        if (props.redirectAfterSuccess) {
            navigateTo(props.redirectTarget);
        }

        if (props.allowGuest && customerStore.customer.guest) {
            pushSuccess(t('account.register.guest.sessionStarted'));
        } else {
            pushSuccess(t('account.register.success'));
        }
    } catch (error) {
        pushError(t('account.register.error'));
        isLoading.value = false;

        if (error instanceof ApiClientError) {
            formErrorStore.formErrors(error.details.errors);
            return;
        }

        formErrorStore.apiErrors.push({ key: 'register', code: 'REGISTER_GENERAL_ERROR' });
    }
};
</script>

<template>
    <FormKit
        type="form"
        :submit-label="$t('account.register.submitLabel')"
        :classes="{
            form: 'grid grid-cols-2 gap-3 w-full',
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

        <AddressFormFields />

        <FormKit
            v-slot="{ value }"
            type="group"
            name="alternativeShippingAddress"
            :classes="{
                outer: {
                    'col-span-2': true,
                },
            }"
        >
            <FormKit
                type="checkbox"
                :label="$t('account.register.alternativeShippingAddress')"
                name="showAlternativeShippingAddress"
                :value="false"
                :classes="{
                    outer: {
                        'col-span-2': true,
                    },
                }"
            />

            <hr class="col-span-2 w-full">

            <template v-if="value?.showAlternativeShippingAddress === true">
                <div class="col-span-2">
                    <span>
                        {{ $t('account.register.shippingAddressHeading') }}
                    </span>
                </div>

                <AddressFormFields address-type="shippingAddress" />

                <hr class="col-span-2 w-full">
            </template>
        </FormKit>

        <div class="col-span-2">
            <span>
                {{ $t('account.register.accountDataHeading') }}
            </span>
        </div>

        <FormKit
            v-if="allowGuest"
            v-model="orderAsGuest"
            type="checkbox"
            :label="$t('account.register.guest.toggle')"
            name="guest"
            decorator-icon="check"
            :classes="{
                outer: {
                    'col-span-2': true,
                },
            }"
        />

        <FormKit
            type="email"
            :label="$t('account.register.email.label')"
            name="email"
            :placeholder="$t('account.register.email.placeholder')"
            :errors="errorOfField('email', formErrorStore.apiErrors)"
            validation="required"
            :classes="{
                outer: {
                    'col-span-2 sm:col-span-1 col-1': true,
                },
            }"
        />

        <FormKit
            v-if="!orderAsGuest"
            type="password"
            :label="$t('account.register.password.label')"
            name="password"
            :placeholder="$t('account.register.password.placeholder')"
            :errors="errorOfField('password', formErrorStore.apiErrors)"
            validation="required"
            suffix-icon="lock"
            :classes="{
                outer: {
                    'col-span-2 sm:col-span-1 col-2': true,
                },
            }"
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
            :classes="{
                outer: {
                    'col-span-2': true,
                },
            }"
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
