<script setup lang="ts">
import { useFormkitHelper } from '~/composables/useFormkitHelper';
import type { FormkitFields } from '~/types/formkit';

const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const { togglePasswordVisibility } = useFormkitHelper();

const handleLogin = (fields: FormkitFields) => {
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
    <FormKit
      type="submit"
      prefix-icon="right-to-bracket"
    >
      login
    </FormKit>
    <NuxtLink :to="{name: 'account-register'}">create account</NuxtLink>
  </FormKit>
  <div v-else>
    <button type="button" class="bg-amber-200" @click="customerStore.logout">Logout</button>
  </div>
</template>