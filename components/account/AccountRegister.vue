<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import { useApiErrorsResolver } from '~/composables/useApiErrorsResolver';
import type { ResolvedApiError } from '~/types/errors';
import { useFormkitHelper } from '~/composables/useFormkitHelper';
import type { FormkitFields } from '~/types/formkit';
import type { Schemas } from '@shopware/api-client/api-types';

const customerStore = useCustomerStore();
const sessionContext = useSessionContext();

const { getSalutations } = useSalutations();
const { getCountries } = useCountries();
const { resolveApiErrors } = useApiErrorsResolver();
const apiErrors = ref<ResolvedApiError[]>([]);
const isLoading = ref(false);

const { errorOfField, togglePasswordVisibility, entityArrayToOptions } = useFormkitHelper();

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
        }
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
        submit-label="register"
        :classes="{
            form: 'grid grid-cols-2 gap-3 w-2/3',
        }"
        :config="{
            validationVisibility: 'dirty',
        }"
        :actions="false"
        @submit="handleRegisterSubmit"
    >
        <div class="col-span-2">
            <span>your data</span>
        </div>
        <FormKit
            type="select"
            label="salutation"
            name="salutationId"
            placeholder="Select a salutation"
            :errors="errorOfField('firstName', apiErrors)"
            validation="required"
            :options="salutationOptions"
            help="select how you would like to be addressed"
        />
        <FormKit
            type="text"
            label="first name"
            name="firstName"
            placeholder="donald"
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
            label="last name"
            name="lastName"
            placeholder="duck"
            :errors="errorOfField('lastName', apiErrors)"
            validation="required"
        />
        <div class="col-span-2">
            <span>your address</span>
        </div>
        <FormKit
            type="group"
            name="billingAddress"
        >
            <FormKit
                type="text"
                label="street"
                autocomplete="street-address"
                name="street"
                placeholder="13 quack street"
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
                label="zip"
                name="zipcode"
                placeholder="1313"
                :errors="errorOfField('billingAddress[zipcode]', apiErrors)"
                validation="required"
            />
            <FormKit
                type="text"
                label="city"
                name="city"
                placeholder="Quackburg"
                :errors="errorOfField('billingAddress[city]', apiErrors)"
                validation="required"
            />
            <FormKit
                v-if="currentCountry"
                type="select"
                label="country"
                name="countryId"
                placeholder="Select a country"
                :options="countryOptions"
                :value="currentCountry"
            />
        </FormKit>
        <div class="col-span-2">
            <span>your account data</span>
        </div>
        <FormKit
            type="email"
            label="email"
            name="email"
            placeholder="quack@platsch.com"
            :errors="errorOfField('email', apiErrors)"
            validation="required"
        />
        <FormKit
            type="password"
            label="password"
            name="password"
            placeholder="password"
            :errors="errorOfField('password', apiErrors)"
            validation="required"
            suffix-icon="lock"
            @suffix-icon-click="togglePasswordVisibility"
        />
        <FormKit
            type="checkbox"
            label="Terms and Conditions"
            help="Do you agree to our terms of service?"
            name="terms"
            :value="false"
            decorator-icon="check"
            validation="accepted"
        />
        <FormKit
            type="submit"
            help="You can use the label prop."
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
                register
            </span>
            <UtilityLoadingSpinner
                v-if="isLoading"
                size="small"
            />
        </FormKit>
    </FormKit>
</template>

<style scoped></style>
