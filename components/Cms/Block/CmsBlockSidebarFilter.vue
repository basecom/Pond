<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);
const slotContent = getSlotContent('content') as Schemas['CmsSlot'];
</script>

<template>
    <CmsLoader
        :content="slotContent"
        class="relative z-10"
    />
</template>
