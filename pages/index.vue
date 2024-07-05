<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);

const email = ref('');
const password = ref('');
function login() {
    customerStore.login({
        username: email.value,
        password: password.value,
    });
}

const formkitlogin = (fields) => {
  console.log(fields, {
    ...fields
  });
  customerStore.login({
    ...fields
  });
}
</script>

<template>
    <h1 class="text-3xl">Hello World!</h1>

<!--    <form v-if="!signedIn" action="#" class="mt-12 flex flex-col gap-3" @submit.prevent="login">-->
<!--        <label for="email">Email</label>-->
<!--        <input id="email" v-model="email" class="border" type="email" name="email" required />-->
<!--        <label for="password" class="mt-3">Password</label>-->
<!--        <input id="password" v-model="password" type="password" class="border" name="password" required />-->
<!--        <button type="submit" class="bg-amber-200">Login</button>-->
<!--    </form>-->
<!--    <div v-else>-->
<!--        <button type="button" class="bg-amber-200" @click="customerStore.logout">Logout</button>-->
<!--    </div>-->
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
        name="password"
      />
    </FormKit>
    <div v-else>
        <button type="button" class="bg-amber-200" @click="customerStore.logout">Logout</button>
    </div>
</template>
