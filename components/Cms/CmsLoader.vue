<script setup lang="ts">
import { kebabCase } from 'scule';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    content: Schemas['CmsSlot'];
}>();

const { getCmsElementComponentName, componentExists } = useCmsUtils();

const isDevelopment = computed(() => import.meta.dev);

provide('cmsElementId', props.content.id);
</script>

<template>
    <div
        v-if="componentExists(getCmsElementComponentName(content?.type))"
        v-cms-element="content"
        :class="['cms-element', `cms-element-${kebabCase(content?.type)}`]"
    >
        <component
            :is="getCmsElementComponentName(content?.type)"
            :element="content"
        />
    </div>

    <div v-else-if="isDevelopment">
        {{ $t('cms.componentNotFound', { componentName: getCmsElementComponentName(content?.type) }) }}
    </div>
</template>
