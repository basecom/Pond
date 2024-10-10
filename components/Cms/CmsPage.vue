<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';

defineProps<{
    cmsPage: Schemas['CmsPage'];
}>();

const { routeName } = useNavigationContext();
const { getCmsSectionComponentName, componentExists, getSectionClasses } = useCmsUtils();

if (routeName.value === 'frontend.navigation.page') {
    createCategoryListingContext();
    useAnalytics({ trackPageView: true, pageType: 'cms' });
}
</script>

<template>
    <div class="cms-page">
        <template
            v-for="section in cmsPage.sections"
            :key="section.id"
        >
            <div :style="getCmsLayoutConfiguration(section).layoutStyles">
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
