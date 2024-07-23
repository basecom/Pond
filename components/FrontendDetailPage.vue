<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
  navigationId: string;
}>();

const { search } = useProductSearch();

const { data: productResponse } = await useAsyncData(
  "cmsProduct" + props.navigationId,
  async () => {
    return await search(props.navigationId, {
      withCmsAssociations: true,
    });
  },
);

if (!productResponse.value) {
  console.error("No product found for navigationId: " + props.navigationId);
  throw new Error("No product found for navigationId: " + props.navigationId);
}

const { product } = useProduct(
  productResponse.value.product,
  productResponse.value.configurator,
);
</script>

<template>
    😱 no details <span v-if="product"> for product <i>{{ getTranslatedProperty(product, 'name') }}</i></span> at the moment

<!-- <CmsPage :content="product.cmsPage" />-->
</template>
