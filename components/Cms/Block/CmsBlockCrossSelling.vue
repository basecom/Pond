<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);
const crossSelling: Schemas['CmsSlot'] = getSlotContent('content');
</script>

<template>
    <CmsLoader :content="crossSelling" />
</template>
