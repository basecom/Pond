<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();
</script>

<template>
    <main class="container flex min-h-screen flex-col items-center justify-center p-8">
        <FormKitIcon
            icon="server"
            class="block h-20 w-20 text-gray-dark"
        />

        <!-- TODO: Snippets -->
        <h1 class="pb-4 pt-6">Server Error - {{ error.statusCode }}</h1>

        <p class="pb-8 text-center">A server error occured. We apologize for the inconvenience!</p>

        <NuxtLink
            class="bg-brand-primary p-4 text-white hover:bg-brand-primary-dark"
            :to="'/'"
        >
            To the homepage
        </NuxtLink>
    </main>
</template>
