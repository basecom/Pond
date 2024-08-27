<script setup lang="ts">
import type { CmsElementProductName } from '@shopware-pwa/composables-next';

defineProps<{
    element: CmsElementProductName;
}>();
</script>

<template>
    <h1 class="font-bold">
        {{ element.data.content }}
    </h1>
</template>
