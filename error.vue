<script setup lang="ts">
withDefaults(
    defineProps<{
      errorCode?: number;
      errorMessage?: string;
    }>(),
    {
        errorCode: 404,
        errorMessage: '',
    },
);
</script>

<template>
    <NuxtLoadingIndicator />

    <LayoutHeader />
    <main class="container">
        <h1>{{ errorCode }}</h1>
        <p>{{ errorMessage }}</p>
    </main>
</template>
