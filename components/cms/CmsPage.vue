<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useCmsPage } from '~/composables/cms/useCmsPage';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';

const props = defineProps<{
  content: Schemas["CmsPage"];
}>();

const { routeName } = useNavigationContext();
if (routeName.value === "frontend.navigation.page") {
  createCategoryListingContext();
}

const {render} = useCmsPage(props.content)

const { getCmsSectionComponentName, componentExists, getSectionClasses } = useCmsUtils()
</script>

<template>
  <div class="cms-page">
    <template
      v-for="section in content.sections"
      :key="section.id"
    >
      <component
        :is="getCmsSectionComponentName(section.type)"
        v-if="componentExists(getCmsSectionComponentName(section.type))"
        :content="section"
        :class="[
          'cms-section',
          `cms-section-${section.type}`,
          getSectionClasses(section),
          getCmsLayoutConfiguration(section).cssClasses,
        ]"
        :style="getCmsLayoutConfiguration(section).layoutStyles"
      />
    </template>
  </div>
<!--  <render />-->
</template>
