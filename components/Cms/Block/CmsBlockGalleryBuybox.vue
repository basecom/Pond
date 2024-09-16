<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftContent: Schemas['CmsSlot'] = getSlotContent('left');
const rightContent: Schemas['CmsSlot'] = getSlotContent('right');
</script>

<template>
    <div class="flex flex-col gap-4 md:flex-row">
        <CmsLoader
            :content="leftContent"
            class="w-full md:w-3/5"
        />
        <CmsLoader
            :content="rightContent"
            class="w-full md:w-2/5"
        />
    </div>
</template>
