<script setup lang="ts">
import { getProductRoute } from '@shopware-pwa/helpers-next';
const { t } = useI18n();

const props = defineProps<{
    navigationId: string;
}>();

const { search } = useProductSearch();
const { getBreadcrumbs } = useCategoryBreadcrumbs();

const { data: productResponse } = await useAsyncData(
    `pdp${props.navigationId}`,
    async () =>
        await search(props.navigationId, {
            withCmsAssociations: true,
            criteria: {
                associations: {
                    canonicalProduct: {},
                    options: {},
                    properties: {
                        associations: {
                            group: {},
                        },
                    },
                    manufacturer: {},
                    seoUrls: {},
                },
            },
        }),
);

if (!productResponse.value) {
    throw createError({ statusCode: 404, message: t('error.404.detail') });
}

const { product } = useProduct(productResponse.value.product, productResponse.value.configurator);

const breadcrumbs = await getBreadcrumbs(productResponse.value.product.seoCategory);

// add product as last breadcrumb entry on pdp
breadcrumbs.push({
    name: product.value.translated.name,
    path: getProductRoute(product.value)?.path,
});

useBreadcrumbs(breadcrumbs);
useAnalytics({ pageType: 'pdp', trackPageView: true });
</script>

<template>
    <CmsPage
        v-if="product?.cmsPage"
        :cms-page="product.cmsPage"
    />
</template>
