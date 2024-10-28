<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const { getSlotContent } = useCmsBlock();

const image: Schemas['CmsSlot'] = getSlotContent('image');
</script>

<template>
    <CmsLoader :content="image" />
</template>
