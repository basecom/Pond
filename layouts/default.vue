<script setup lang="ts">
const customerStore = useCustomerStore();
const { signedIn, customer, loading } = storeToRefs(customerStore);

customerStore.refreshContext();
</script>

<template>
    <NuxtRouteAnnouncer />
    <UtilityLoadingSpinner v-if="loading" />

    <header v-show="!loading" class="p-5">
        <h1 class="text-2xl">Pond. Hier kommt ein Header hin.</h1>
        <h2>Status: {{ signedIn ? 'Eingeloggt' : 'Gast' }}</h2>
        <h3 v-if="signedIn">Du bist: {{ customer?.firstName }}</h3>
    </header>
    <main v-show="!loading" class="mt-4 p-5">
        <NuxtPage />
    </main>
    <footer v-show="!loading" class="p-5">
        <p>Pond. Hier kommt ein Footer hin</p>
    </footer>
</template>
