<script setup lang="ts">
import type { CmsElementText } from '@shopware-pwa/composables-next';
import { decodeHTML } from 'entities';

const props = defineProps<{
    element: CmsElementText;
}>();
</script>

<template>
    <!-- v-html is necessary because the text contains inline stylings -->
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="decodeHTML(props.element.data.content)" />
</template>
