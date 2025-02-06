export function useSeoUrl() {
    const getUrlByProductId = async (id: string) => {
        return {
            path: await getSeoUrlByProductId(id),
            state: {
                routeName: 'frontend.detail.page',
                foreignKey: id,
            },
        };
    };

    return { getUrlByProductId };
}

const getSeoUrlByProductId = async (id: string) => {
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
            includes: {
                seo_url: ['seoPathInfo'],
            },
        },
    });

    const seoUrl = seoUrls?.elements[0]?.seoPathInfo;

    return seoUrl ? `/${seoUrl}` : `/detail/${id}`;
};
