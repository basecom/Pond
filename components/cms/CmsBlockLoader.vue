<script setup lang="ts">
import { kebabCase } from 'scule';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';
import type { Schemas } from '@shopware/api-client/api-types';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';

defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getCmsBlockComponentName, componentExists, getBlockClasses } = useCmsUtils();

const isDevelopment = computed(() => import.meta.dev);
</script>

<template>
    <div
        v-if="componentExists(getCmsBlockComponentName(block.type))"
        :class="[
            'cms-block',
            `cms-block-${kebabCase(block.type)}`,
            getBlockClasses(block),
            getCmsLayoutConfiguration(block).cssClasses,
        ]"
        :style="getCmsLayoutConfiguration(block).layoutStyles"
    >
        <component
            :is="getCmsBlockComponentName(block.type)"
            :id="block.id"
            :block="block"
        />
    </div>
    <div v-else-if="isDevelopment">{{ getCmsBlockComponentName(block.type) }} not found</div>
</template>
