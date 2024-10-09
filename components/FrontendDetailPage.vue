<script setup lang="ts">
import { getCategoryBreadcrumbs } from '@shopware-pwa/helpers-next';
const { getProductRoute } = useProductRoute();
const { t } = useI18n();

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
    throw createError({ statusCode: 404, message: t('error.pageNotFound') });
}

const { product } = useProduct(productResponse.value.product, productResponse.value.configurator);

const breadcrumbs = getCategoryBreadcrumbs(productResponse.value.product.seoCategory, {
    startIndex: 1,
});

// add product as last breadcrumb entry on pdp
breadcrumbs.push({
    name: product.value.translated.name,
    path: getProductRoute(product.value),
});

useBreadcrumbs(breadcrumbs);
</script>

<template>
    <CmsPage
        v-if="product?.cmsPage"
        :cms-page="product.cmsPage"
    />
</template>
