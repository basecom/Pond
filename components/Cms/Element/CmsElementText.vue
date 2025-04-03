<script setup lang="ts">
import type { CmsElementText } from '@shopware-pwa/composables-next';
import { decodeHTML } from 'entities';

const props = defineProps<{
    element: CmsElementText;
}>();

const config = useCmsElementConfig(props.element);
const content = config.getConfigValue('content');
</script>

<template>
    <!-- v-html is necessary because the text contains inline stylings -->
    <!-- eslint-disable vue/no-v-html -->
    <div
        v-if="content"
        class="cms_html"
        v-html="decodeHTML(content)"
    />
</template>
