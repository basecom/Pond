<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftImage: Schemas['CmsSlot'] = getSlotContent('left');
const centerText: Schemas['CmsSlot'] = getSlotContent('center');
const rightImage: Schemas['CmsSlot'] = getSlotContent('right');
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
