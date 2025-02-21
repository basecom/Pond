<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const text = getSlotContent('content') as Schemas['CmsSlot'];
</script>

<template>
    <div class="min-h-72 content-center p-10">
        <CmsLoader :content="text" />
    </div>
</template>
