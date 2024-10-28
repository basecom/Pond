<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getSlotContent } = useCmsBlock();

const imageGalleryContent: Schemas['CmsSlot'] = getSlotContent('imageGallery');
</script>

<template>
    <CmsLoader :content="imageGalleryContent" />
</template>
