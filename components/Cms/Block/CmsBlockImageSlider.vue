<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getSlotContent } = useCmsBlock();

const imageSliderContent: Schemas['CmsSlot'] = getSlotContent('imageSlider');
</script>

<template>
    <CmsLoader :content="imageSliderContent" />
</template>
