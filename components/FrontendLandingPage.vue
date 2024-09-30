<script setup lang="ts">
const props = defineProps<{
    navigationId: string;
}>();

const { search } = useLandingSearch();
const { t } = useI18n();

const { data: landingResponse } = await useAsyncData('landing' + props.navigationId, async () => {
    return await search(props.navigationId, {
        withCmsAssociations: true,
    });
});

if (!landingResponse.value) {
    throw createError({ statusCode: 404, message: t('error.pageNotFound') });
}

useBreadcrumbs([
    {
        name: landingResponse.value.translated.name,
        path: landingResponse.value.url,
    },
]);
</script>

<template>
    <CmsPage
        v-if="landingResponse?.cmsPage"
        :cms-page="landingResponse.cmsPage"
    />
</template>
