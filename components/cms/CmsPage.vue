<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';

defineProps<{
    content: Schemas['CmsPage'];
}>();

const { routeName } = useNavigationContext();
if (routeName.value === 'frontend.navigation.page') {
    createCategoryListingContext();
}

const { getCmsSectionComponentName, componentExists, getSectionClasses } = useCmsUtils();
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
</template>
