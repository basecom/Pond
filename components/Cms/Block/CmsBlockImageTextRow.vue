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
</script>

<template>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
            <CmsLoader :content="leftImage" />

            <div class="pt-4">
                <CmsLoader :content="leftText" />
            </div>
        </div>

        <div>
            <CmsLoader :content="centerImage" />

            <div class="pt-4">
                <CmsLoader :content="centerText" />
            </div>
        </div>

        <div>
            <CmsLoader :content="rightImage" />

            <div class="pt-4">
                <CmsLoader :content="rightText" />
            </div>
        </div>
    </div>
</template>
