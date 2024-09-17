<script setup lang="ts">
import { pascalCase } from 'scule';

const { resolvePath } = useNavigationSearch();
const route = useRoute();
const { refreshSessionContext } = useSessionContext();
const { getWishlistProducts } = useWishlist();
await refreshSessionContext();
await getWishlistProducts();

const { locale } = useI18n();
const routePath = route.path.replace(`${locale.value}`, '').replace('//', '/');

const { data: seoResult } = await useAsyncData('seoPath' + routePath, async () => {
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

if (!routeName.value) {
    throw createError({ statusCode: 404, message: 'page not found' });
}
</script>

<template>
    <component
        :is="pascalCase(routeName)"
        v-if="componentExists(pascalCase(routeName))"
        :navigation-id="foreignKey"
    />
</template>
