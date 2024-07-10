<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const formkitlogin = (fields) => {
  customerStore.login({
    ...fields
  });
}
</script>

<template>
  <FormKit
    v-if="!signedIn"
    type="form"
    submit-label="login >"
    @submit="formkitlogin"
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
    />
    <NuxtLink :to="{name: 'account-register'}">noch keinen account? hier einen erstellen</NuxtLink>
  </FormKit>
  <div v-else>
    <button type="button" class="bg-amber-200" @click="customerStore.logout">Logout</button>
  </div>
</template>