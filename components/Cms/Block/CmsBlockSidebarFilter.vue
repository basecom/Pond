<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getSlotContent } = useCmsBlock();
const slotContent: Schemas['CmsSlot'] = getSlotContent('content');
</script>

<template>
    <CmsLoader :content="slotContent" />
</template>
