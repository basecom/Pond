<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
  navigationId: string;
}>();

const { search } = useCategorySearch();
const route = useRoute();

const { data: categoryResponse } = await useAsyncData(
  "cmsNavigation" + props.navigationId,
  async () => {
    return await search(props.navigationId, {
      withCmsAssociations: true,
      query: {
        ...route.query,
      },
    });
  },
);
const { category } = useCategory(categoryResponse);
</script>

<template>
  navigation page incoming <i>{{ getTranslatedProperty(category, 'name') }}</i>
  <!-- <CmsPage v-if="category?.cmsPage" :content="category.cmsPage" />-->
</template>
