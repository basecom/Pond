<script setup lang="ts">
import type { CmsElementProductName } from '@shopware-pwa/composables-next';

const props = defineProps<{
    element: CmsElementProductName;
}>();

const config = useCmsElementConfig(props.element);
const content = config.getConfigValue('content');
</script>

<template>
    <h1 class="font-bold">
        {{ content }}
    </h1>
</template>
