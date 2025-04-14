<script setup lang="ts">
import type {NuxtError} from 'nuxt/app';
import NotFoundError from './components/Error/NotFoundError.vue';

const props = defineProps<{
  error: NuxtError;
}>();

const pageNotFound = computed(() => props.error.statusCode === 404);

</script>

<template>
    <NuxtLoadingIndicator />
    <template v-if="pageNotFound">
        <slot name="notFoundError"><NotFoundError /></slot>
    </template>
</template>
