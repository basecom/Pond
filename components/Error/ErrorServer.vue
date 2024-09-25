<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
    error: NuxtError;
}>();
</script>

<template>
    <main class="container flex flex-col items-center justify-center min-h-screen p-8">
        <FormKitIcon
            icon="server"
            class="block h-20 w-20 text-gray-dark"
        />

        <!-- TODO: Snippets -->
        <h1 class="pt-6 pb-4">
            Server Error - {{ error.statusCode }}
        </h1>

        <p class="pb-8 text-center">
            A server error occured. We apologize for the inconvenience!
        </p>

        <NuxtLink
            class="bg-brand-primary p-4 text-white hover:bg-brand-primary-dark"
            :to="'/'"
        >
            To the homepage
        </NuxtLink>
    </main>
</template>