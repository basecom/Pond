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
    <div class="grid grid-cols-5 gap-4">
        <CmsLoader
            :content="leftContent"
            class="col-span-5 sm:col-span-3"
        />

        <CmsLoader
            :content="rightContent"
            class="col-span-5 sm:col-span-2"
        />
    </div>
</template>
