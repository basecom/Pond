<script setup lang="ts">
import { kebabCase } from 'scule';
import type { Schemas } from '@shopware/api-client/api-types';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';

const props = defineProps<{
  block: Schemas['CmsBlock'];
}>();

const { getSlotContent } = useCmsBlock(props.block);

const leftContent: Schemas['CmsSlot'] = getSlotContent('left');
const rightContent: Schemas['CmsSlot'] = getSlotContent('right');

const { getCmsElementComponentName, componentExists } = useCmsUtils();
</script>

<template>
  <div class="flex flex-col md:flex-row gap 4">
    <component
      :is="getCmsElementComponentName(leftContent.type)"
      v-if="componentExists(getCmsElementComponentName(leftContent.type))"
      :element="leftContent"
      class="flex-grow"
      :class="['cms-element', `cms-element-${kebabCase(leftContent.type)}`]"
    />
    <div v-else class="flex-grow">{{ getCmsElementComponentName(leftContent.type) }} not found</div>
    <component
      :is="getCmsElementComponentName(rightContent.type)"
      v-if="componentExists(getCmsElementComponentName(rightContent.type))"
      :element="rightContent"
      class="w-full md:w-96"
      :class="['cms-element', `cms-element-${kebabCase(rightContent.type)}`]"
    />
    <div v-else class="w-[24rem]">{{ getCmsElementComponentName(rightContent.type) }} not found</div>
  </div>
</template>

<style scoped>

</style>