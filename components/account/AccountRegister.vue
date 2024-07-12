<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
const {register} = useUser();
const sessionContext = useSessionContext();

const { getSalutations } = useSalutations();
const { getCountries } = useCountries();

const handleRegisterSubmit = (fields) => {
  try {
    register({
      ...fields,
      billingAddress: {
        city: fields['billingAddress[city]'],
        countryId: fields['billingAddress[countryId]'],
        street: fields['billingAddress[street]'],
        zipcode: fields['billingAddress[zipcode]'],
      }
    });
    navigateTo('/account')
  } catch (e) {
    console.error(e)
  }
}

const handlePasswordTogle = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'lock' ? 'lock-open' : 'lock'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
  <FormKit
    type="form"
    submit-label="register"
    :classes="{
      form: 'grid grid-cols-2 gap-3',
      actions: 'col-span-2'
    }"
    @submit="handleRegisterSubmit"
  >
    <div class="col-span-2">
      <span>your data</span>
    </div>
    <FormKit
      type="select"
      label="salutation"
      placeholder="Select a salutation"
      name="salutationId"
      help="select how you would like to be addressed"
    >
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
      help="your firstname"
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
    />
    <FormKit
      type="text"
      label="city"
      name="billingAddress[city]"
      placeholder="Quackburg"
    />
    <FormKit
      type="select"
      label="country"
      placeholder="Select a country"
      name="billingAddress[countryId]"
    >
      <option
        v-for="country in getCountries.sort((a, b) => getTranslatedProperty(a, 'name') > getTranslatedProperty(b, 'name') ? 1 : -1)"
        :key="`country_${country.id}`"
        :value="country.id"
        :selected="country.id === sessionContext.countryId"
      >
        {{getTranslatedProperty(country, 'name')}}
      </option>
    </FormKit>
    <div class="col-span-2">
      <span>your account data</span>
    </div>
    <FormKit
      type="email"
      label="email"
      name="email"
      placeholder="quack@platsch.com"
    />
    <FormKit
      type="password"
      label="password"
      name="password"
      placeholder="password"
      prefix-icon="lock"
      suffix-icon="lock"
      @suffix-icon-click="handlePasswordTogle"
    />
<!--      type="checkbox"-->
<!--      label="acceptedDataProtection"-->
<!--      name="acceptedDataProtection"-->
    <FormKit
      type="checkbox"
      label="Terms and Conditions"
      help="Do you agree to our terms of service?"
      name="terms"
      :value="true"
      decorator-icon="check"
    />
  </FormKit>
</template>

<style scoped>

</style>