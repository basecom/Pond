<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const imageSliderContent: Schemas['CmsSlot'] = getSlotContent('imageSlider');
</script>

<template>
    <CmsLoader :content="imageSliderContent" />
</template>
