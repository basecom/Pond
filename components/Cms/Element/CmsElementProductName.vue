<script setup lang="ts">
import type { CmsElementProductName } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementProductName;
}>();

const { getCmsElementData } = useCmsUtils();
const content = getCmsElementData(props.element, 'content');
</script>

<template>
    <h1 class="font-bold">
        {{ content }}
    </h1>
</template>
