<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftContent = getSlotContent('left') as Schemas['CmsSlot'];
const centerContent = getSlotContent('center') as Schemas['CmsSlot'];
const rightContent = getSlotContent('right') as Schemas['CmsSlot'];
</script>

<template>
    <div class="grid gap-4 p-4 md:grid-cols-3">
        <CmsLoader
            :content="leftContent"
            class="border-8 border-white"
        />
        <CmsLoader
            :content="centerContent"
            class="border-8 border-white"
        />
        <CmsLoader
            :content="rightContent"
            class="border-8 border-white"
        />
    </div>
</template>
