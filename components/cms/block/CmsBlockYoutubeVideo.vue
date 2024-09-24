<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);
const video: Schemas['CmsSlot'] = getSlotContent('video');
</script>

<template>
    <CmsLoader :content="video" />
</template>