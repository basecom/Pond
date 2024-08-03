<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { kebabCase } from 'scule';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';
import { useCmsPageUniversal } from '~/composables/cms/useCmsPageUniversal';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';

const props = defineProps<{
  content: Schemas["CmsSection"];
}>();

// console.log(props.content);

// const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(props.content);
//
// const {render} = useCmsPageUniversal(props.content);

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
<!--  <render />-->
</template>

<style scoped>

</style>