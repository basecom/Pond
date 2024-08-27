<script setup lang="ts">
const props = defineProps<{
    navigationId: string;
}>();

const { search } = useProductSearch();

const { data: productResponse } = await useAsyncData('pdp' + props.navigationId, async () => {
    return await search(props.navigationId, {
        withCmsAssociations: true,
        criteria: {
            associations: {
                properties: {
                    associations: {
                        group: {},
                    },
                },
                manufacturer: {},
            },
        },
    });
});

if (!productResponse.value) {
    throw createError({ statusCode: 404, message: 'page not found' });
}

const { product } = useProduct(productResponse.value.product, productResponse.value.configurator);
</script>

<template>
    <CmsPage
        v-if="product?.cmsPage"
        :cms-page="product.cmsPage"
    />
</template>
