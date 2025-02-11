import type { Schemas } from '@shopware/api-client/api-types';

/**
 * Get product route information for Vue router.
 * This composable uses the referencedId of the product and the id as a fallback - thus making it compatible with objects of type Product, LineItem and OrderLineItem.
 * The original code is from the getProductRoute function of `@shopware-pwa/helpers-next`
 *
 * Returns product URL and route information for resolving SEO url.
 * Use it in combination with `<RouterLink>`, `<NuxtLink>` or `<LocaleLink>`.
 */
export function useProductRoute() {
    const getProductRoute = (product: Schemas['Product'] | Schemas['LineItem'] | Schemas['OrderLineItem']) => ({
        path: getProductUrl(product),
        state: {
            routeName: 'frontend.detail.page',
            foreignKey: 'referencedId' in product ? product?.referencedId : product?.id,
        },
    });

    const getProductUrl = (product: Schemas['Product'] | Schemas['LineItem'] | Schemas['OrderLineItem']) => {
        if (!product) return '/';

        if ('seoUrls' in product) {
            return `/${product?.seoUrls?.[0]?.seoPathInfo}`;
        }

        const productId = 'referencedId' in product ? product?.referencedId : product?.id;
        return `/detail/${productId}`;
    };

    return { getProductRoute };
}
