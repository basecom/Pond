<script setup lang="ts">
import { kebabCase } from 'scule';
import type { Schemas } from '@shopware/api-client/api-types';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';
import type { StyleValue } from 'vue';

const props = defineProps<{
    block: Schemas['CmsBlock'];
}>();

const { getCmsBlockComponentName, componentExists, getBlockClasses } = useCmsUtils();

const isDevelopment = computed(() => import.meta.dev);
const componentStyle = computed(() => getCmsLayoutConfiguration(props.block).layoutStyles as StyleValue);
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
        :style="componentStyle"
    >
        <component
            :is="getCmsBlockComponentName(block.type)"
            :id="block.id"
            :block="block"
        />
    </div>
    <div v-else-if="isDevelopment">
        {{ $t('cms.componentNotFound', { componentName: getCmsBlockComponentName(block.type) }) }}
    </div>
</template>
