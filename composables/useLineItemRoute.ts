import type { Schemas } from '@shopware/api-client/api-types';

export function useLineItemRoute() {
    const getLineItemRoute = async (lineItem: Schemas.LineItem | Schemas.OrderLineItem) => {
        return {
            path: await getLineItemUrl(lineItem),
            state: {
                routeName: 'frontend.detail.page',
                foreignKey: lineItem.referencedId,
            },
        };
    }

    return { getLineItemRoute };
}

const getLineItemUrl = async (lineItem: Schemas.LineItem | Schemas.OrderLineItem) => {
    if (!lineItem) return '/';

    const { apiClient } = useShopwareContext();

    const { data: seoUrls } = await apiClient.invoke('readSeoUrl post /seo-url', {
        body: {
            filter: [
                {
                    type: 'equals',
                    field: 'pathInfo',
                    value: '/detail/' + lineItem.referencedId,
                },
            ],
            limit: 1,
        },
    });

    const seoUrl = seoUrls?.elements[0]?.seoPathInfo;

    return seoUrl ? `/${seoUrl}` : `/detail/${lineItem.referencedId}`;
}
