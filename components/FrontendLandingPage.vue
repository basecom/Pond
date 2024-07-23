<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import ContentNotFound from '~/components/errors/ContentNotFound.vue';

const props = defineProps<{
  navigationId: string;
}>();

const { search } = useLandingSearch();

const { data: landingResponse } = await useAsyncData(
  "cmsLanding" + props.navigationId,
  async () => {
    return await search(props.navigationId, {
      withCmsAssociations: true,
    });
  },
);
</script>

<template>
  <ContentNotFound v-if="!landingResponse?.cmsPage" />
  <template v-else>
    🏗️ landing page under construction for <i>{{ getTranslatedProperty(landingResponse, 'name') }}</i>
    <!-- <CmsPage v-if="landingResponse?.cmsPage" :content="landingResponse.cmsPage" />-->
  </template>
</template>
