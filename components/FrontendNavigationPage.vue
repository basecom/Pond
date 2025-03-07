<script setup lang="ts">
const props = defineProps<{
  navigationId: string;
}>();

const { getCategory } = usePondGetEntities();
const { t } = useI18n();

const categoryResponse = await getCategory(props.navigationId);
if (!categoryResponse?.value) {
    throw createError({ statusCode: 404, message: t('error.404.detail') });
}

const { category } = useCategory(categoryResponse);
createCategoryListingContext();
</script>

<template>
    <CmsPage
        v-if="category?.cmsPage"
        :cms-page="category.cmsPage"
    />
</template>
