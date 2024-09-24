<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();

const customerStore = useCustomerStore();
const { refreshCart } = useCart();
const { loading } = storeToRefs(customerStore);

customerStore.refreshContext();
refreshCart();
</script>

<template>
    <NuxtLoadingIndicator />
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader v-show="!loading" />

    <UtilityToastNotifications />

    <main
        v-show="!loading"
        class="mt-4 w-screen"
    >
        <div class="container flex flex-col items-center justify-center">
            <h1 class="pb-4">{{ error.statusCode }} - {{ error.message }}</h1>

            <NuxtLink
                class="inline-flex max-w-56 items-center justify-center bg-brand-primary px-4 py-2 text-center text-white hover:bg-brand-primary-dark"
                :to="{ name: 'index' }"
            >
                {{ $t('global.homepageLinkLabel') }}
            </NuxtLink>
        </div>
    </main>

    <LayoutFooter v-show="!loading" />
</template>
