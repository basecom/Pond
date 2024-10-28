<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getSlotContent } = useCmsBlock();
const productSlider: Schemas['CmsSlot'] = getSlotContent('productSlider');
</script>

<template>
    <CmsLoader :content="productSlider" />
</template>
