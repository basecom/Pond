<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const imageGalleryContent: Schemas['CmsSlot'] = getSlotContent('imageGallery');
</script>

<template>
    <CmsLoader :content="imageGalleryContent" />
</template>
