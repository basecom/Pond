<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { CmsSlotConfig } from '~/types/cms/CmsSlotConfig';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftImage = getSlotContent('left-image') as CmsSlotConfig;
const leftText = getSlotContent('left-text') as Schemas['CmsSlot'];

const centerImage = getSlotContent('center-image') as CmsSlotConfig;
const centerText = getSlotContent('center-text') as Schemas['CmsSlot'];

const rightImage = getSlotContent('right-image') as CmsSlotConfig;
const rightText = getSlotContent('right-text') as Schemas['CmsSlot'];

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
