<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftImage: Schemas['CmsSlot'] = getSlotContent('left-image');
const leftText: Schemas['CmsSlot'] = getSlotContent('left-text');

const centerImage: Schemas['CmsSlot'] = getSlotContent('center-image');
const centerText: Schemas['CmsSlot'] = getSlotContent('center-text');

const rightImage: Schemas['CmsSlot'] = getSlotContent('right-image');
const rightText: Schemas['CmsSlot'] = getSlotContent('right-text');

const leftImageHeight = leftImage?.config?.minHeight?.value ?? '300px';
const centerImageHeight = centerImage?.config?.minHeight?.value ?? '300px';
const rightImageHeight = rightImage?.config?.minHeight?.value ?? '300px';
</script>

<template>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
            <div
                class="m-auto aspect-square overflow-hidden rounded-full"
                :style="{ height: leftImageHeight }"
            >
                <CmsLoader :content="leftImage" />
            </div>

            <div class="pt-4">
                <CmsLoader :content="leftText" />
            </div>
        </div>

        <div>
            <div
                class="m-auto aspect-square overflow-hidden rounded-full"
                :style="{ height: centerImageHeight }"
            >
                <CmsLoader :content="centerImage" />
            </div>

            <div class="pt-4">
                <CmsLoader :content="centerText" />
            </div>
        </div>

        <div>
            <div
                class="m-auto aspect-square overflow-hidden rounded-full"
                :style="{ height: rightImageHeight }"
            >
                <CmsLoader :content="rightImage" />
            </div>

            <div class="pt-4">
                <CmsLoader :content="rightText" />
            </div>
        </div>
    </div>
</template>
