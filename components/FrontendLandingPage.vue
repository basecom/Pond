<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

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
  throw createError({statusCode: 404, message: 'page not found'})
}
</script>

<template>
    <div>
        🏗️ landing page under construction for <i>{{ getTranslatedProperty(landingResponse, 'name') }}</i>
        <!-- <CmsPage v-if="landingResponse?.cmsPage" :content="landingResponse.cmsPage" />-->
    </div>
</template>
