import type { Schemas } from '@shopware/api-client/api-types';

/**
 * Get product route information for Vue router.
 * This composable uses the referencedId of the product and the id as a fallback - thus making it compatible with objects of type Product, LineItem and OrderLineItem.
 * The original code is from the getProductRoute function of `@shopware-pwa/helpers-next`
 *
 * Returns product URL and route information for resolving SEO url.
 * Use it in combination with `<RouterLink>` or `<NuxtLink>`.
 */
export function useProductRoute() {
    const getProductRoute = (product: Schemas.Product | Schemas.LineItem | Schemas.OrderLineItem) => {
        return {
            path: getProductUrl(product),
            state: {
                routeName: "frontend.detail.page",
                foreignKey: product?.referencedId ?? product?.id
            }
        };
    };

    return { getProductRoute };
}

function getProductUrl(product: Schemas.Product | Schemas.LineItem | Schemas.OrderLineItem) {
    let _a, _b;
    if (!product)
        return "/";
    const seoUrl = (_b = (_a = product.seoUrls) == null ? void 0 : _a[0]) == null ? void 0 : _b.seoPathInfo;
    return seoUrl ? `/${seoUrl}` : `/detail/${product.referencedId ?? product.id}`;
}