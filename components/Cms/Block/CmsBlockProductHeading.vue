<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);
const leftContent = getSlotContent('left') as Schemas['CmsSlot'];
const rightContent = getSlotContent('right') as Schemas['CmsSlot'];
</script>

<template>
    <div class="flex justify-between">
        <CmsLoader :content="leftContent" />
        <CmsLoader :content="rightContent" />
    </div>
</template>
