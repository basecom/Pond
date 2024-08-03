<script setup lang="ts">
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';

const props = defineProps<{
    navigationId: string;
}>();

const { search } = useProductSearch();

const { data: productResponse } = await useAsyncData('pdp' + props.navigationId, async () => {
    return await search(props.navigationId, {
        withCmsAssociations: true,
    });
});

if (!productResponse.value) {
    console.error('No product found for navigationId: ' + props.navigationId);
    throw new Error('No product found for navigationId: ' + props.navigationId);
}

if (!productResponse.value) {
  throw createError({statusCode: 404, message: 'page not found'})
}

const { product } = useProduct(productResponse.value.product, productResponse.value.configurator);
</script>

<template>
    <div>
        😱 no details for product <i>{{ getTranslatedProperty(product, 'name') }}</i> at the moment
        <!-- <CmsPage :content="product.cmsPage" />-->
    </div>
</template>
