<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftContent: Schemas['CmsSlot'] = getSlotContent('left');
const centerLeftContent: Schemas['CmsSlot'] = getSlotContent('center-left');
const centerRightContent: Schemas['CmsSlot'] = getSlotContent('center-right');
const rightContent: Schemas['CmsSlot'] = getSlotContent('right');
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CmsLoader :content="leftContent" />
        <CmsLoader :content="centerLeftContent" />
        <CmsLoader :content="centerRightContent" />
        <CmsLoader :content="rightContent" />
    </div>
</template>
