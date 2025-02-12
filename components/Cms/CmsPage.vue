<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';

defineProps<{
    cmsPage: Schemas['CmsPage'];
}>();

const { getCmsSectionComponentName, componentExists, getSectionClasses } = useCmsUtils();
</script>

<template>
    <div class="cms-page">
        <template
            v-for="section in cmsPage.sections"
            :key="section.id"
        >
            <div>
                <component
                    :is="getCmsSectionComponentName(section.type)"
                    v-if="componentExists(getCmsSectionComponentName(section.type))"
                    :section="section"
                    :class="[
                        'cms-section',
                        `cms-section-${section.type}`,
                        getSectionClasses(section),
                        getCmsLayoutConfiguration(section).cssClasses,
                    ]"
                    :style="section.sizingMode !== 'boxed' ? getCmsLayoutConfiguration(section).layoutStyles : null"
                />
            </div>
        </template>
    </div>
</template>
