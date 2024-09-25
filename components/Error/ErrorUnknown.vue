<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();
</script>

<template>
    <ErrorLayout>
        <FormKitIcon
            icon="question"
            class="block h-20 w-20 text-gray-dark"
        />

        <!-- TODO: Snippets -->
        <h1 class="pb-4 pt-6">Unknown Error - {{ error.statusCode }}</h1>

        <p class="pb-8 text-center">
            Ooops, an unexpected error occured. This should not have happened. We apologize for the inconvenience!
        </p>

        <NuxtLink
            class="bg-brand-primary p-4 text-white hover:bg-brand-primary-dark"
            :to="'/'"
        >
            To the homepage
        </NuxtLink>
    </ErrorLayout>
</template>
