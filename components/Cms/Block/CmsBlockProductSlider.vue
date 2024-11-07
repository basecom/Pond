<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);
const productSlider: Schemas['CmsSlot'] = getSlotContent('productSlider');
</script>

<template>
    <CmsLoader :content="productSlider" />
</template>
