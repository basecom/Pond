<script setup lang="ts">
import type { CmsElementText } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementText;
}>();

const config = useCmsElementConfig(props.element);
const content = config.getConfigValue('content');
</script>

<template>
    <!-- v-html is necessary because we need to render html -->
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="content" />
</template>
