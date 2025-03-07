<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
  element: Schemas['CmsSlot'];
}>();

const { getConfigValue } = useCmsElementConfig(props.element);
const content = getConfigValue('content');
</script>

<template>
    <!-- v-html is necessary because we need to render html -->
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="content" />
</template>
