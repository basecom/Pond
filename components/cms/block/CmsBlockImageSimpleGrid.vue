<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftBottomContent: Schemas['CmsSlot'] = getSlotContent('left-bottom');
const leftTopContent: Schemas['CmsSlot'] = getSlotContent('left-top');
const rightContent: Schemas['CmsSlot'] = getSlotContent('right');
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2">
        <CmsLoader
            :content="leftTopContent"
            style="grid-area: left-top"
        />
        <CmsLoader
            :content="leftBottomContent"
            style="grid-area: left-bottom"
        />
        <CmsLoader
            :content="rightContent"
            class="right-image col-span-2"
            style="grid-area: right"
        />
    </div>
</template>

<style>
.cms-block-image-simple-grid {
    grid-template-areas:
        'left-top    right'
        'left-bottom right';
}

.cms-block-image-simple-grid .right-image img {
    @apply absolute inset-0 !h-full;
}
</style>
