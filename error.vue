<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <div class="container flex flex-col justify-center items-center">
    <h1>{{ error.statusCode }} - {{error.message}}</h1>
    <NuxtLink
      class="max-w-56 inline-flex items-center justify-center bg-brand-primary px-4 py-2 text-center text-white hover:bg-brand-primary-dark"
      :to="{ name: 'index' }"
    >
      Homepage
    </NuxtLink>
  </div>
</template>