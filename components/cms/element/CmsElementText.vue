<script setup lang="ts">
import type { CmsElementText } from '@shopware-pwa/composables-next';
import { decodeHTML } from 'entities';
import sanitize from 'sanitize-html';

const props = defineProps<{
    element: CmsElementText;
}>();
</script>

<template>
    <div v-html="sanitize(decodeHTML(props.element.data.content))"></div>
</template>
