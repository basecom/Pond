<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { ResolvedApiError } from '~/types/errors';
import type { FormkitFields } from '~/types/formkit';
import type { Schemas } from '@shopware/api-client/api-types';

const customerStore = useCustomerStore();
const sessionContext = useSessionContext();
const { getSalutations } = useSalutations();
const { getCountries } = useCountries();
const { resolveApiErrors } = useApiErrorsResolver();
const { errorOfField, togglePasswordVisibility, entityArrayToOptions } = useFormkitHelper();
const apiErrors = ref<ResolvedApiError[]>([]);
const isLoading = ref(false);

const handleRegisterSubmit = async (fields: FormkitFields) => {
    isLoading.value = true;
    apiErrors.value = [];
    try {
        await customerStore.register({
            ...fields,
        });
        isLoading.value = false;
        navigateTo('/account');
    } catch (error) {
        isLoading.value = false;

        if (error instanceof ApiClientError) {
            apiErrors.value = resolveApiErrors(error.details.errors);
            return;
        }

        apiErrors.value.push({ key: 'register', code: 'REGISTER_GENERAL_ERROR' });
    }
};

const countryOptions = computed(() => entityArrayToOptions<Schemas['Country']>(getCountries.value, 'name', true) ?? []);
const salutationOptions = computed(
    () => entityArrayToOptions<Schemas['Salutation']>(getSalutations.value, 'displayName', true) ?? [],
);

const currentCountry = computed(() => sessionContext.countryId.value);
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
            v-if="apiErrors.filter(error => error.key === 'register').length"
            class="validation-errors text-status-danger"
        >
            <li
                v-for="(error, index) in apiErrors.filter(error => error.key === 'register')"
                :key="`login-error-${index}`"
            >
                {{ error.code }}
            </li>
        </ul>
        <div class="col-span-2">
            <span>{{ $t('account.register.dataHeading') }}</span>
        </div>

        <FormKit
            type="select"
            :label="$t('account.register.salutationInput.label')"
            name="salutationId"
            :placeholder="$t('account.register.salutationInput.placeholder')"
            :errors="errorOfField('firstName', apiErrors)"
            validation="required"
            :classes="{
                outer: {
                    'col-span-2 md:col-span-1 col-1': true,
                },
            }"
            :options="salutationOptions"
            :help="$t('account.register.salutationInput.help')"
        />

        <FormKit
            type="text"
            :label="$t('account.register.firstnameInput.label')"
            name="firstName"
            :placeholder="$t('account.register.firstnameInput.placeholder')"
            :errors="errorOfField('firstName', apiErrors)"
            validation="required"
            :classes="{
                outer: {
                    'col-start-1 col-1': true,
                },
            }"
        />

        <FormKit
            type="text"
            :label="$t('account.register.lastnameInput.label')"
            name="lastName"
            :placeholder="$t('account.register.lastnameInput.placeholder')"
            :errors="errorOfField('lastName', apiErrors)"
            validation="required"
        />

        <div class="col-span-2">
            <span>{{ $t('account.register.addressHeading') }}</span>
        </div>

        <FormKit
            type="group"
            name="billingAddress"
        >
            <FormKit
                type="text"
                :label="$t('account.register.streetInput.label')"
                autocomplete="street-address"
                name="street"
                :placeholder="$t('account.register.streetInput.placeholder')"
                :errors="errorOfField('billingAddress[street]', apiErrors)"
                validation="required"
                :classes="{
                    outer: {
                        'col-start-1 col-span-2': true,
                    },
                }"
            />
            <FormKit
                type="text"
                :label="$t('account.register.zipCodeInput.label')"
                name="zipcode"
                :placeholder="$t('account.register.zipCodeInput.placeholder')"
                :errors="errorOfField('billingAddress[zipcode]', apiErrors)"
                validation="required"
            />
            <FormKit
                type="text"
                :label="$t('account.register.cityInput.label')"
                name="city"
                :placeholder="$t('account.register.cityInput.placeholder')"
                :errors="errorOfField('billingAddress[city]', apiErrors)"
                validation="required"
            />
            <FormKit
                v-if="currentCountry"
                type="select"
                :label="$t('account.register.countryInput.label')"
                name="countryId"
                :placeholder="$t('account.register.countryInput.placeholder')"
                :options="countryOptions"
                :value="currentCountry"
                :classes="{
                    outer: {
                        'col-span-2 md:col-span-1 col-1': true,
                    },
                }"
            />
        </FormKit>

        <div class="col-span-2">
            <span>{{ $t('account.register.accountDataHeading') }}</span>
        </div>

        <FormKit
            type="email"
            :label="$t('account.register.emailInput.label')"
            name="email"
            :placeholder="$t('account.register.emailInput.placeholder')"
            :errors="errorOfField('email', apiErrors)"
            validation="required"
        />

        <FormKit
            type="password"
            :label="$t('account.register.passwordInput.label')"
            name="password"
            :placeholder="$t('account.register.passwordInput.placeholder')"
            :errors="errorOfField('password', apiErrors)"
            validation="required"
            suffix-icon="lock"
            @suffix-icon-click="togglePasswordVisibility"
        />

        <FormKit
            type="checkbox"
            :label="$t('account.register.termsInput.label')"
            :help="$t('account.register.termsInput.help')"
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
