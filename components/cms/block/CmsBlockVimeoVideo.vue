<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CmsLoader from '~/components/cms/CmsLoader.vue';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const video: Schemas['CmsSlot'] = getSlotContent('video');
</script>

<template>
    <CmsLoader :content="video" />
</template>
