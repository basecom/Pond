<script setup lang="ts">
import { getCategoryBreadcrumbs } from "@shopware-pwa/helpers-next";

const props = defineProps<{
    navigationId: string;
}>();

const { search } = useCategorySearch();
const route = useRoute();

const { data: categoryResponse } = await useAsyncData('navigation' + props.navigationId, async () => {
    return await search(props.navigationId, {
        withCmsAssociations: true,
        query: {
            ...route.query,
        },
    });
});

if (!categoryResponse.value) {
    throw createError({ statusCode: 404, message: 'page not found' });
}

const { category } = useCategory(categoryResponse);

const breadcrumbs = getCategoryBreadcrumbs(
    categoryResponse.value,
    {
        startIndex: 1,
    }
);

useBreadcrumbs(breadcrumbs);
</script>

<template>
    <CmsPage
        v-if="category?.cmsPage"
        :cms-page="category.cmsPage"
    />
</template>
