export const useNavigationStore = defineStore('navigation', () => {
    const { apiClient } = useShopwareContext();

    const _depths = useState('mainNavigationDepths', () => 0);
    const { data, refresh } = useAsyncData(
        'mainNavigationElements',
        async () => {
            const loadNavigation = async (depth: number) => {
                try {
                    const navigationResponse = await apiClient.invoke(
                        'readNavigation post /navigation/{activeId}/{rootId}',
                        {
                            headers: {
                                'sw-include-seo-urls': true,
                            },
                            pathParams: {
                                activeId: 'main-navigation',
                                rootId: 'main-navigation',
                            },
                            body: {
                                depth,
                            },
                        },
                    );

                    return navigationResponse.data || [];
                } catch (e) {
                    return [];
                }
            };

            return await loadNavigation(_depths.value);
        },
        { dedupe: 'defer', immediate: false },
    );
    const mainNavigationElements = computed(() => data?.value ?? []);

    async function loadMainNavigation(depth: number) {
        _depths.value = depth;

        await refresh();
    }

    return {
        mainNavigationElements,
        loadMainNavigation,
    };
});
