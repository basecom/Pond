<script setup lang="ts">
import { kebabCase } from 'scule';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    content: Schemas['CmsSlot'];
}>();

const { getCmsElementComponentName, componentExists } = useCmsUtils();
</script>

<template>
    <component
        :is="getCmsElementComponentName(content.type)"
        v-if="componentExists(getCmsElementComponentName(content.type))"
        :element="content"
        :class="['cms-element', `cms-element-${kebabCase(content.type)}`]"
    />
    <div v-else-if="process.dev">{{ getCmsElementComponentName(content.type) }} not found</div>
</template>
