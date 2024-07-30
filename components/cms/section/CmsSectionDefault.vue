<script setup lang="ts">

import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
  content: Schemas["CmsSection"];
}>();
</script>

<template>
  <div>
    section default
  </div>
</template>

<style scoped>

</style>