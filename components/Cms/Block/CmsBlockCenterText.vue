<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftImage = getSlotContent('left  ') as Schemas['CmsSlot'];
const centerText = getSlotContent('center  ') as Schemas['CmsSlot'];
const rightImage = getSlotContent('right  ') as Schemas['CmsSlot'];
</script>

<template>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <CmsLoader :content="leftImage" />

        <div class="content-center">
            <CmsLoader :content="centerText" />
        </div>

        <CmsLoader :content="rightImage" />
    </div>
</template>
