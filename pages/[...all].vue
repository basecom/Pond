<script setup lang="ts">
import { pascalCase } from 'scule';

const { clearBreadcrumbs } = useBreadcrumbs();

const { resolvePath } = useNavigationSearch();
const route = useRoute();
const { t } = useI18n();

/**
 * Replace the locale value from the route path
 * but only if the locale is not the default locale
 * and only the first /${locale} will be replaced
 */
const { $i18n } = useNuxtApp();
const { locale } = useI18n();
const defaultLocale = $i18n.defaultLocale;
const routePath =
    locale.value !== defaultLocale
        ? route.path.replace(/^\/[^/]+/, '')
        : route.path;

const { data: seoResult } = await useAsyncData(`seoPath${routePath}`, async () => {
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
    throw createError({ statusCode: 404, message: t('error.404.detail') });
}

onBeforeRouteLeave(() => {
    clearBreadcrumbs();
});
</script>

<template>
    <component
        :is="pascalCase(routeName)"
        v-if="componentExists(pascalCase(routeName))"
        :navigation-id="foreignKey"
    />
</template>
