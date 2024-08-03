<script setup lang="ts">
import { pascalCase } from 'scule';
import { useCmsUtils } from '~/composables/cms/useCmsUtils';

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
const { componentExists } = useCmsUtils();

const componentName = routeName.value;

if (!componentName) {
  throw createError({statusCode: 404, message: 'page not found'})
}
</script>

<template>
    <component
      :is="pascalCase(componentName)"
      v-if="componentExists(pascalCase(componentName))"
      :navigation-id="foreignKey"
    />
</template>
