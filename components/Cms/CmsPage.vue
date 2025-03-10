<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';
import type { StyleValue } from 'vue';

const props = defineProps<{
    cmsPage: Schemas['CmsPage'];
}>();

const { getCmsSectionComponentName, componentExists, getSectionClasses } = useCmsUtils();
const getComponentStyle = (section: Schemas['CmsSection']) => getCmsLayoutConfiguration(section).layoutStyles as StyleValue;

provide('cmsPage', props.cmsPage);
</script>

<template>
    <div v-cms-page="cmsPage" class="cms-page">
        <template
            v-for="section in cmsPage.sections"
            :key="section.id"
        >
            <div :style="getComponentStyle(section)">
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
