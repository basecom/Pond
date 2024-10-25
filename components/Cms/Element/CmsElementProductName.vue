<script setup lang="ts">
import type { CmsElementProductName } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementProductName;
}>();

const elementData = useCmsElementData(props.element);
const content = elementData.getData('content');
</script>

<template>
    <h1 class="font-bold">
        {{ content }}
    </h1>
</template>
