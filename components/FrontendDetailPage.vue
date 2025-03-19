<script setup lang="ts">
const props = defineProps<{
  navigationId: string;
}>();

const { t } = useI18n();
const { search } = useProductSearch();

const productResponse = await search(props.navigationId, {
    withCmsAssociations: true,
});

if (!productResponse) {
    throw createError({statusCode: 404, message: t('error.404.heading')});
}

const { product: productDetail } = useProduct(productResponse);
</script>

<template>
    <CmsPage v-if="productDetail.product?.cmsPage" :content="productDetail.product.cmsPage" />
</template>
