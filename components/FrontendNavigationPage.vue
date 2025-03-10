<script setup lang="ts">
const props = defineProps<{
    navigationId: string;
}>();

const { search } = useCategorySearch();
const { getBreadcrumbs } = useCategoryBreadcrumbs();
const route = useRoute();
const { t } = useI18n();
const { isHomePage } = useHomePage();

const { data: categoryResponse } = await useAsyncData(
    `navigation${props.navigationId}`,
    async () =>
        await search(props.navigationId, {
            withCmsAssociations: true,
            query: {
                ...route.query,
            },
        }),
);

if (!categoryResponse.value) {
    throw createError({ statusCode: 404, message: t('error.404.detail') });
}

const { category } = useCategory(categoryResponse);

const breadcrumbs = !isHomePage.value ? await getBreadcrumbs(category.value) : [];

createCategoryListingContext();
useBreadcrumbs(breadcrumbs);
useAnalytics({ trackPageView: true, pageType: 'navigation' });
</script>

<template>
    <CmsPage
        v-if="category?.cmsPage"
        :cms-page="category.cmsPage"
    />
</template>
