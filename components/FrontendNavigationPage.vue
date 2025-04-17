<script setup lang="ts">
import { getTranslatedProperty } from '@shopware/helpers';

const props = defineProps<{
  navigationId: string;
}>();

const { t } = useI18n();
const { search } = useCategorySearch();

const categoryResponse = await search(props.navigationId, {
    withCmsAssociations: true,
});

if (!categoryResponse) {
    throw createError({statusCode: 404, message: t('error.404.heading')});
}

const { category } = useCategory(categoryResponse);

useHead(() => ({
    title: getTranslatedProperty(category.value, 'name'),
}));
</script>

<template>
    <CmsPage v-if="category.cmsPage" :content="category.cmsPage" />
</template>
