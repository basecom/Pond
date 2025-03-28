<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/CmsPage.vue
import { getBackgroundImageUrl, getCmsLayoutConfiguration } from '@shopware-pwa/helpers-next';
import { pascalCase } from 'scule';
import { computed, h, resolveComponent } from 'vue';
import { createCategoryListingContext, useNavigationContext } from '#imports';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
  content: Schemas['CmsPage'];
}>();

const { routeName } = useNavigationContext();
if (routeName.value === 'frontend.navigation.page') {
    createCategoryListingContext();
}

const cmsSections = computed<Schemas['CmsSection'][]>(() => props.content?.sections || []);

const DynamicRender = () => {
    const componentsMap = cmsSections.value.map((section) => ({
        name: `CmsSection${pascalCase(section.type)}`,
        component: resolveComponent(`CmsSection${pascalCase(section.type)}`),
        section,
    }));
    return componentsMap.map((componentObject) => {
        const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(
            componentObject.section,
        );
        if (typeof componentObject.component === 'string') {
            return h('div', {}, `There is no ${componentObject.component}`);
        }

        if (layoutStyles?.backgroundImage) {
            layoutStyles.backgroundImage = getBackgroundImageUrl(
                layoutStyles.backgroundImage,
                componentObject.section,
            );
        }

        return h(componentObject.component, {
            content: componentObject.section,
            class: {
                ...cssClasses,
                // change: replace max-w-screen-2xl with container
                'container mx-auto': layoutStyles?.sizingMode === 'boxed',
            },
            style: {
                backgroundColor: layoutStyles?.backgroundColor,
                backgroundImage: layoutStyles?.backgroundImage,
                backgroundSize: layoutStyles?.backgroundSize,
            },
        });
    });
};
</script>

<template>
    <DynamicRender />
</template>
