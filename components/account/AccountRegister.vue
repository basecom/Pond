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
</script>

<template>
  <FormKit
    type="form"
    submit-label="register"
    @submit="handleRegisterSubmit"
  >
    <FormKit
      type="select"
      label="salutation"
      placeholder="Select a salutation"
      name="salutationId"
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
    />
    <FormKit
      type="text"
      label="last name"
      name="lastName"
      placeholder="duck"
    />
    <FormKit
      type="text"
      label="steet"
      autocomplete="street-address"
      name="billingAddress[street]"
      placeholder="13 quack streed"
    />
    <FormKit
      type="number"
      label="steet"
      autocomplete="street-address"
      name="billingAddress[street]"
      placeholder="13"
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
    />
  </FormKit>
</template>

<style scoped>

</style>