<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { kebabCase } from 'scule';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';

defineProps<{
  content: Schemas["CmsSection"];
}>();

const { getCmsBlockComponentName, componentExists, getBlockClasses } = useCmsUtils();
</script>

<template>
  <div>
    <template
        v-for="block in content.blocks"
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
          getBlockClasses(block),
          getCmsLayoutConfiguration(block).cssClasses,
        ]"
        :style="getCmsLayoutConfiguration(block).layoutStyles"
      />
      <div v-else>
        {{ getCmsBlockComponentName(block.type) }} not found
      </div>
    </template>
  </div>
</template>