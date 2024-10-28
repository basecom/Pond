<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock();

const video: Schemas['CmsSlot'] = getSlotContent('video');
</script>

<template>
    <CmsLoader :content="video" />
</template>
