<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftImage = getSlotContent('left-image') as Schemas['CmsSlot'];
const leftText = getSlotContent('left-text') as Schemas['CmsSlot'];

const centerImage = getSlotContent('center-image') as Schemas['CmsSlot'];
const centerText = getSlotContent('center-text') as Schemas['CmsSlot'];

const rightImage = getSlotContent('right-image') as Schemas['CmsSlot'];
const rightText = getSlotContent('right-text') as Schemas['CmsSlot'];
</script>

<template>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="shadow-md">
            <CmsLoader :content="leftImage" />

            <div class="p-5">
                <CmsLoader :content="leftText" />
            </div>
        </div>

        <div class="shadow-md">
            <CmsLoader :content="centerImage" />

            <div class="p-5">
                <CmsLoader :content="centerText" />
            </div>
        </div>

        <div class="shadow-md">
            <CmsLoader :content="rightImage" />

            <div class="p-5">
                <CmsLoader :content="rightText" />
            </div>
        </div>
    </div>
</template>
