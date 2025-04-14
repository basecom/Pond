<script setup lang="ts">
import NotFoundErrorInner from "./NotFoundErrorInner.vue";
</script>

<template>
  <ErrorLayout>
    <template #error>
      <NotFoundErrorInner />
    </template>
  </ErrorLayout>
</template>
