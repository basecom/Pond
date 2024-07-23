<script setup lang="ts">
import { pascalCase } from 'scule';

const { resolvePath } = useNavigationSearch();
const route = useRoute();

const routePath = route.path.replace('//', '/');

const { data: seoResult } = await useAsyncData('cmsResponse' + routePath, async () => {
    // For client links if the history state contains seo url information we can omit the api call
    if (import.meta.client) {
        if (history.state?.routeName) {
            return {
                routeName: history.state?.routeName,
                foreignKey: history.state?.foreignKey,
            };
        }
    }
    return await resolvePath(routePath);
});

const { routeName, foreignKey } = useNavigationContext(seoResult);

const componentName = routeName.value;

const render = () => {
    if (!componentName) return h('template', h(resolveComponent('ErrorsRoutingNotFound')));

    const componentNameToResolve = pascalCase(componentName as string);
    const cmsPageView = routeName && resolveComponent(componentNameToResolve);

    if (cmsPageView) {
        if (cmsPageView === componentNameToResolve)
            return h('div', {}, 'Problem resolving component: ' + componentName);
        return h('div', h(cmsPageView, { navigationId: foreignKey.value }));
    }
    return h('div', {}, 'Loading...');
};
</script>

<template>
    <render />
</template>
