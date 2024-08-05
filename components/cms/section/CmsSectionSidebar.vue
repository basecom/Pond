<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { kebabCase } from 'scule';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';

const props = defineProps<{
    content: Schemas['CmsSection'];
}>();
const { getPositionContent } = useCmsSection(props.content);

const sidebarBlocks = getPositionContent('sidebar');
const mainBlocks = getPositionContent('main');
const { getCmsBlockComponentName, componentExists } = useCmsUtils();
</script>

<template>
    <div class="block md:flex md:flex-row md:gap-4">
        <div class="w-full md:w-1/4">
            <template
                v-for="block in sidebarBlocks"
                :key="block.id"
            >
                <component
                    :is="getCmsBlockComponentName(block.type)"
                    v-if="componentExists(getCmsBlockComponentName(block.type))"
                    :id="block.id"
                    :slots="block"
                    :class="[
                        'cms-block',
                        `cms-block-${kebabCase(block.type)}`,
                        getCmsLayoutConfiguration(block).cssClasses,
                    ]"
                    :style="getCmsLayoutConfiguration(block).layoutStyles"
                />
                <div v-else>{{ getCmsBlockComponentName(block.type) }} not found</div>
            </template>
        </div>
        <div class="w-full md:w-auto md:flex-grow">
            <template
                v-for="block in mainBlocks"
                :key="block.id"
            >
                <component
                    :is="getCmsBlockComponentName(block.type)"
                    v-if="componentExists(getCmsBlockComponentName(block.type))"
                    :id="block.id"
                    :slots="block"
                    :class="[
                        'cms-block',
                        `cms-block-${kebabCase(block.type)}`,
                        getCmsLayoutConfiguration(block).cssClasses,
                    ]"
                    :style="getCmsLayoutConfiguration(block).layoutStyles"
                />
                <div v-else>{{ getCmsBlockComponentName(block.type) }} not found</div>
            </template>
        </div>
    </div>
</template>

<style scoped></style>
