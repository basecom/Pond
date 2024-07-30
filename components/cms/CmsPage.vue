<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { useCmsPage } from '~/composables/cms/useCmsPage';

const props = defineProps<{
  content: Schemas["CmsPage"];
}>();

const { routeName } = useNavigationContext();
if (routeName.value === "frontend.navigation.page") {
  createCategoryListingContext();
}

const {render} = useCmsPage(props.content)

</script>

<template>
  <render />
</template>
