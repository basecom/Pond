<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftBottomContent = getSlotContent('left-bottom') as Schemas['CmsSlot'];
const leftTopContent = getSlotContent('left-top') as Schemas['CmsSlot'];
const rightContent = getSlotContent('right') as Schemas['CmsSlot'];
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2">
        <CmsLoader
            :content="leftTopContent"
            class="order-1"
        />
        <CmsLoader
            :content="rightContent"
            class="right-image order-3 row-span-2 md:order-2"
        />
        <CmsLoader
            :content="leftBottomContent"
            class="order-2 md:order-3"
        />
    </div>
</template>

<style>
.cms-block-image-simple-grid .right-image img {
    @apply inset-0 md:absolute md:!h-full;
}
</style>
