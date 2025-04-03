<script setup lang="ts">
import { getTranslatedProperty } from '@shopware/helpers';

const props = defineProps<{
  navigationId: string;
}>();

const { t } = useI18n();
const { search } = useLandingSearch();

const landingPage = await search(props.navigationId, {
    withCmsAssociations: true,
});

if (!landingPage) {
    throw createError({statusCode: 404, message: t('error.404.heading')});
}

useHead(() => ({
    title: getTranslatedProperty(landingPage, 'name'),
}));
</script>

<template>
    <CmsPage v-if="landingPage.cmsPage" :content="landingPage.cmsPage" />
</template>
