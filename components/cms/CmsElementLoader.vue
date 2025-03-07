<script setup lang="ts">
import { kebabCase } from 'scule';
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  content: Schemas['CmsSlot'];
}>();

const { getCmsElementComponentName, componentExists, isDevelopment } = usePondCmsUtils();
</script>

<template>
    <div
        v-if="componentExists(getCmsElementComponentName(content.type))"
        :class="['cms-element', `cms-element-${kebabCase(content.type)}`]"
    >
        <component
            :is="getCmsElementComponentName(content.type)"
            :element="content"
        />
    </div>

    <div v-else-if="isDevelopment()">
        {{ $t('error.cms', { componentName: getCmsElementComponentName(content.type) }) }}
    </div>
</template>
