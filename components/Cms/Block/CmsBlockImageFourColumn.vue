<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftContent = getSlotContent('left') as Schemas['CmsSlot'];
const centerLeftContent = getSlotContent('center-left') as Schemas['CmsSlot'];
const centerRightContent = getSlotContent('center-right') as Schemas['CmsSlot'];
const rightContent = getSlotContent('right') as Schemas['CmsSlot'];
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CmsLoader :content="leftContent" />
        <CmsLoader :content="centerLeftContent" />
        <CmsLoader :content="centerRightContent" />
        <CmsLoader :content="rightContent" />
    </div>
</template>
