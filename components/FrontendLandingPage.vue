<script setup lang="ts">
const props = defineProps<{
    navigationId: string;
}>();

const { search } = useLandingSearch();

const { data: landingResponse } = await useAsyncData('landing' + props.navigationId, async () => {
    return await search(props.navigationId, {
        withCmsAssociations: true,
    });
});

if (!landingResponse.value) {
    throw createError({ statusCode: 404, message: 'page not found' });
}

useBreadcrumbs([
    // TODO: Replace with dynamic home page name
    {
        name: 'Startseite',
        path: '/'
    },
    {
        name: landingResponse.value.translated.name,
        path: landingResponse.value.url
    }
]);
</script>

<template>
    <CmsPage
        v-if="landingResponse?.cmsPage"
        :cms-page="landingResponse.cmsPage"
    />
</template>
