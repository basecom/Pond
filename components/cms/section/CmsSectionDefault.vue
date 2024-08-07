<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { kebabCase } from 'scule';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';

defineProps<{
    section: Schemas['CmsSection'];
}>();

const { getCmsBlockComponentName, componentExists, getBlockClasses } = useCmsUtils();
</script>

<template>
    <div>
        <template
            v-for="block in section.blocks"
            :key="block.id"
        >
            <component
                :is="getCmsBlockComponentName(block.type)"
                v-if="componentExists(getCmsBlockComponentName(block.type))"
                :id="block.id"
                :block="block"
                :class="[
                    'cms-block',
                    `cms-block-${kebabCase(block.type)}`,
                    getBlockClasses(block),
                    getCmsLayoutConfiguration(block).cssClasses,
                ]"
                :style="getCmsLayoutConfiguration(block).layoutStyles"
            />
            <div v-else>{{ getCmsBlockComponentName(block.type) }} not found</div>
        </template>
    </div>
</template>
