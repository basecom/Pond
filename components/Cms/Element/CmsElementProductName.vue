<script setup lang="ts">
import type { CmsElementProductName } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementProductName;
}>();

const data = useCmsElementData(props.element);
const content = data.getData('content');
</script>

<template>
    <h1 class="font-bold">
        {{ content }}
    </h1>
</template>
