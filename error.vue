<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
    error: NuxtError;
}>();

const pageNotFound = computed(() => {
    return props.error.statusCode === 404;
});

const isMaintenanceMode = computed(() => {
    // 503 could also be thrown if the server is under heavy load, so we check the message too
    return props.error.statusCode === 503 && props.error.message.includes('maintenance mode');
});
</script>

<template>
    <NuxtLoadingIndicator />

    <template v-if="pageNotFound">
        <!-- TODO: History back wenn man von error page woanders hingeht und dann zurück auf error drauf lädt nicht -->
        <ErrorNotFound />
    </template>

    <template v-else-if="isMaintenanceMode">
        <ErrorMaintenance />
    </template>

    <template v-else>
        <!-- TODO: History back wenn man von error page woanders hingeht und dann zurück auf error drauf lädt nicht -->
        <ErrorUnknown :error="props.error" />
    </template>
</template>
