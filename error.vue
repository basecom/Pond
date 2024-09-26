<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
    error: NuxtError;
}>();

const pageNotFound = computed(() => {
    return props.error.statusCode === 404;
});

const isMaintenanceMode = computed(() => {
    return props.error.statusCode === 503 && props.error.statusMessage === "MAINTENANCE_MODE";
});

const genericServerError = computed(() => {
    return props.error.statusCode >= 500;
});
</script>

<template>
    <NuxtLoadingIndicator />

    <template v-if="pageNotFound">
        <ErrorNotFound />
    </template>

    <template v-else-if="isMaintenanceMode">
        <ErrorMaintenance />
    </template>

    <template v-else-if="genericServerError">
        <ErrorServer :error="props.error" />
    </template>

    <template v-else>
        <ErrorUnknown :error="props.error" />
    </template>
</template>
