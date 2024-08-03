<script setup lang="ts">
import type { CmsElementText } from '@shopware-pwa/composables-next';
import { decodeHTML } from 'entities';

const props = defineProps<{
  element: CmsElementText;
}>();
// TODO add sanitize html
</script>

<template>
  <div v-html="decodeHTML(props.element.data.content)"></div>
</template>

<style scoped>

</style>