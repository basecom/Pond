export function useSeoUrl() {

    const { apiClient } = useShopwareContext();
    const seoUrlStore = useSeoUrlStore();
    const { navigationId } = storeToRefs(seoUrlStore);
    const route = useRoute();

    const getUrlByProductId = async (id: string) => ({
        path: await getSeoUrlByProductId(id),
        state: {
            routeName: 'frontend.detail.page',
            foreignKey: id,
        },
    });

    const getSeoUrlByNavigationId = async () => {
        const params = new URLSearchParams(
            route.query as Record<string, string>,
        );
        const seoPath = await getSeoUrlForForeignKey(navigationId.value);
        return `${seoPath}?${params.toString()}`;
    };

    const isCustomRoute = computed(() => navigationId.value !== '');

    const getSeoUrlForForeignKey = async (id: string): Promise<string> => {
        if (!id) return '/';

        const { data: seoUrls } = await apiClient.invoke('readSeoUrl post /seo-url', {
            body: {
                filter: [
                    {
                        type: 'equals',
                        field: 'foreignKey',
                        value: id,
                    },
                ],
            },
        });

        return seoUrls.elements?.[0]?.seoPathInfo ?? '';
    };

    const getSeoUrlByProductId = async (id: string) => {
        if (!id) return '/';

        const { data: seoUrls } = await apiClient.invoke('readSeoUrl post /seo-url', {
            body: {
                filter: [
                    {
                        type: 'equals',
                        field: 'pathInfo',
                        value: `/detail/${id}`,
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


    return { getUrlByProductId, getSeoUrlByNavigationId, isCustomRoute };
}
