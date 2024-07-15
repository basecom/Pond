<script setup lang="ts">
import { useFormkitHelper } from '~/composables/useFormkitHelper';
import type { FormkitLoginFields } from '~/types/formkit';

const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const { togglePasswordVisibility } = useFormkitHelper();

const handleLogin = (fields: FormkitLoginFields) => {
  customerStore.login({
    ...fields
  });
}
</script>

<template>
  <FormKit
    v-if="!signedIn"
    type="form"
    submit-label="login"
    @submit="handleLogin"
  >
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
    <NuxtLink :to="{name: 'account-register'}">create account here</NuxtLink>
  </FormKit>
  <FormKit v-else
    type="submit"
    prefix-icon="right-from-bracket"
    @click.prevent="customerStore.logout"
  >
    logout
  </FormKit>
</template>