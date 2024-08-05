<script setup lang="ts">
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
    throw createError({ statusCode: 404, message: 'page not found' });
}

const { product } = useProduct(productResponse.value.product, productResponse.value.configurator);
</script>

<template>
    <div>
        <CmsPage :content="product.cmsPage" />
    </div>
</template>
