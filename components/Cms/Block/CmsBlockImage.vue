<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const image: Schemas['CmsSlot'] = getSlotContent('image');
</script>

<template>
    <CmsLoader :content="image" />
</template>
