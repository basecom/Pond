<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import { ApiClientError } from '@shopware/api-client';
import { useApiErrorsResolver } from '~/composables/useApiErrorsResolver';
import type { ResolvedApiError } from '~/types/errors';
import { useFormkitHelper } from '~/composables/useFormkitHelper';
import type { FormkitFields } from '~/types/formkit';

const customerStore = useCustomerStore();
const sessionContext = useSessionContext();

const { getSalutations } = useSalutations();
const { getCountries } = useCountries();
const { resolveApiErrors } = useApiErrorsResolver();
const apiErrors =  ref<ResolvedApiError[]>([]);

const {formatFormFields, errorOfField, togglePasswordVisibility, entityArrayToOptions} = useFormkitHelper();

const handleRegisterSubmit = async (fields: FormkitFields) => {
  apiErrors.value = [];
  try {
    await customerStore.register({
      ...formatFormFields(fields),
    });
    navigateTo('/account')
  } catch (error) {
    console.error(error)

    if (error instanceof ApiClientError) {
      apiErrors.value = resolveApiErrors(error.details.errors);
    }
  }
}

const data = computed(() => entityArrayToOptions(getCountries, 'name', true) ?? []);

const currentCountry = computed(() => sessionContext.countryId.value);
</script>

<template>
  <FormKit
    type="form"
    submit-label="register"
    :classes="{
      form: 'grid grid-cols-2 gap-3 w-2/3',
      actions: 'col-span-2'
    }"
    :config="{
      validationVisibility: 'dirty',
    }"
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
      help="select how you would like to be addressed"
    >
      <option value="#">select something</option>
      <option
        v-for="salutation in getSalutations"
        :key="`salutation_${salutation.id}`"
        :value="salutation.id"
      >
        {{getTranslatedProperty(salutation, 'displayName')}}
      </option>
    </FormKit>
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
        }
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
      type="text"
      label="street"
      autocomplete="street-address"
      name="billingAddress[street]"
      placeholder="13 quack street"
      :errors="errorOfField('billingAddress[street]', apiErrors)"
      validation="required"
      :classes="{
        outer: {
          'col-start-1 col-span-2': true,
        }
      }"
    />
    <FormKit
      type="text"
      label="zip"
      name="billingAddress[zipcode]"
      placeholder="1313"
      :errors="errorOfField('billingAddress[zipcode]', apiErrors)"
      validation="required"
    />
    <FormKit
      type="text"
      label="city"
      name="billingAddress[city]"
      placeholder="Quackburg"
      :errors="errorOfField('billingAddress[city]', apiErrors)"
      validation="required"
    />
    <FormKit
      v-if="currentCountry"
      type="select"
      label="country"
      name="billingAddress[countryId]"
      placeholder="Select a country"
      :options="data"
      :value="currentCountry"
    />
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
  </FormKit>
</template>

<style scoped>

</style>