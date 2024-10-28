<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getSlotContent } = useCmsBlock();
const leftContent: Schemas['CmsSlot'] = getSlotContent('left');
const rightContent: Schemas['CmsSlot'] = getSlotContent('right');
</script>

<template>
    <div class="flex justify-between">
        <CmsLoader :content="leftContent" />
        <CmsLoader :content="rightContent" />
    </div>
</template>
