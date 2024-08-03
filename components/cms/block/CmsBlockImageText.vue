<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { kebabCase } from 'scule';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';

const props = defineProps<{
  slots: object;
}>();

const { getSlotContent } = useCmsBlock(props.slots);

const leftContent: Schemas["CmsSlot"] = getSlotContent("left");
const rightContent: Schemas['CmsSlot'] = getSlotContent("right");

const { getCmsElementComponentName, componentExists } = useCmsUtils();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
    <component
      :is="getCmsElementComponentName(leftContent.type)"
      v-if="componentExists(getCmsElementComponentName(leftContent.type))"
      :element="leftContent"
      :class="[
        'cms-element',
        `cms-element-${kebabCase(leftContent.type)}`,
      ]"
    />
    <div v-else>
      {{ getCmsElementComponentName(leftContent.type) }} not found
    </div>
    <component
      :is="getCmsElementComponentName(rightContent.type)"
      v-if="componentExists(getCmsElementComponentName(rightContent.type))"
      :element="rightContent"
      :class="[
        'cms-element',
        `cms-element-${kebabCase(rightContent.type)}`,
      ]"
    />
    <div v-else>
      {{ getCmsElementComponentName(rightContent.type) }} not found
    </div>
  </div>
</template>

<style scoped>

</style>