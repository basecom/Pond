<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getSlotContent } = useCmsBlock();

const leftContent: Schemas['CmsSlot'] = getSlotContent('left');
const centerContent: Schemas['CmsSlot'] = getSlotContent('center');
const rightContent: Schemas['CmsSlot'] = getSlotContent('right');
</script>

<template>
    <div class="grid gap-4 md:grid-cols-3">
        <CmsLoader :content="leftContent" />
        <CmsLoader :content="centerContent" />
        <CmsLoader :content="rightContent" />
    </div>
</template>
