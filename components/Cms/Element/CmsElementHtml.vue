<script setup lang="ts">
import type { CmsElementText } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementText;
}>();
</script>

<template>
    <!-- v-html is necessary because we need to render html -->
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="props.element.data.content" />
</template>
