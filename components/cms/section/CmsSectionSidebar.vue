<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import CmsBlockLoader from '~/components/cms/CmsBlockLoader.vue';

const props = defineProps<{
    section: Schemas['CmsSection'];
}>();

const { getPositionContent } = useCmsSection(props.section);

const sidebarBlocks = getPositionContent('sidebar');
const mainBlocks = getPositionContent('main');
</script>

<template>
    <div class="block md:flex md:flex-row md:gap-4">
        <div class="w-full md:w-1/4">
            <template
                v-for="block in sidebarBlocks"
                :key="block.id"
            >
                <CmsBlockLoader :block="block" />
            </template>
        </div>

        <div class="md:3/4 w-full md:flex-grow">
            <template
                v-for="block in mainBlocks"
                :key="block.id"
            >
                <CmsBlockLoader :block="block" />
            </template>
        </div>
    </div>
</template>
