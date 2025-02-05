import type { Schemas } from '@shopware/api-client/api-types';

/**
 * Get product route information for Vue router.
 * This composable uses the referencedId of the product and the id as a fallback - thus making it compatible with objects of type Product, LineItem and OrderLineItem.
 * The original code is from the getProductRoute function of `@shopware-pwa/helpers-next`
 * An additional function was added to fetch the seoUrls of a product by using the productId
 *
 * Returns product URL and route information for resolving SEO url.
 * Use it in combination with `<RouterLink>`, `<NuxtLink>` or `<LocaleLink>`.
 */
export function useProductRoute() {
    const getProductRoute = (product: Schemas.Product | Schemas.LineItem | Schemas.OrderLineItem) => {
        return {
            path: getProductUrl(product),
            state: {
                routeName: 'frontend.detail.page',
                foreignKey: product?.referencedId ?? product?.id,
            },
        };
    };

    const getProductRouteById = async (id: string) => {
        return {
            path: await getProductUrlById(id),
            state: {
                routeName: 'frontend.detail.page',
                foreignKey: id,
            },
        };
    }

    return { getProductRoute, getProductRouteById };
}

function getProductUrl(product: Schemas.Product | Schemas.LineItem | Schemas.OrderLineItem) {
    let _a, _b;
    if (!product) return '/';
    const seoUrl = (_b = (_a = product.seoUrls) == null ? void 0 : _a[0]) == null ? void 0 : _b.seoPathInfo;
    return seoUrl ? `/${seoUrl}` : `/detail/${product.referencedId ?? product.id}`;
}

const getProductUrlById = async (id: string) => {
    if (!id) return '/';

    const { apiClient } = useShopwareContext();

    const { data: seoUrls } = await apiClient.invoke('readSeoUrl post /seo-url', {
        body: {
            filter: [
                {
                    type: 'equals',
                    field: 'pathInfo',
                    value: '/detail/' + id,
                },
            ],
            limit: 1,
        },
    });

    const seoUrl = seoUrls?.elements[0]?.seoPathInfo;

    return seoUrl ? `/${seoUrl}` : `/detail/${id}`;
}
