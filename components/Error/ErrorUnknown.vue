<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
    error: NuxtError;
}>();
</script>

<template>
    <ErrorLayout>
        <template #content>
            <!-- TODO: Check  why this is necessary -> directly loading the icon destroys the rendering -->
            <ErrorIcon :icon="'question'" />

            <!-- TODO: Snippets -->
            <h1 class="pt-6 pb-4">
                Unknown Error - {{ error.statusCode }}
            </h1>

            <p class="pb-8 text-center">
                Ooops, an unexpected error occured. This should not have happened. We apologize for the inconvenience!
            </p>

            <NuxtLink
                class="bg-brand-primary p-4 text-white hover:bg-brand-primary-dark"
                :to="'/'"
            >
                To the homepage
            </NuxtLink>
        </template>
    </ErrorLayout>
</template>