<script setup lang="ts">
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
</script>

<template>
    <CmsPage
        v-if="category?.cmsPage"
        :content="category.cmsPage"
    />
</template>
