import type { Schemas } from '@shopware/api-client/api-types';

export const useNavigationStore = defineStore('navigation', () => {
    const { apiClient } = useShopwareContext();

    const _depths = useState('mainNavigationDepths', () => 0);
    const mainNavigationElements = useState<Schemas['Category'][]>('mainNavigationElements', () => []);
    const footerNavigationElements = useState<Schemas['Category'][]>('footerNavigationElements', () => []);
    const serviceNavigationElements = useState<Schemas['Category'][]>('serviceNavigationElements', () => []);

    const loadNavigation = async (type: string, depth: number): Promise<Schemas['Category'][]> => {
        try {
            const navigationResponse = await apiClient.invoke(
                'readNavigation post /navigation/{activeId}/{rootId}',
                {
                    headers: {
                        'sw-include-seo-urls': true,
                    },
                    pathParams: {
                        activeId: type,
                        rootId: type,
                    },
                    body: {
                        depth,
                    },
                },
            );

            return navigationResponse.data || [];
        } catch ( e ) {
            return [];
        }
    };

    async function loadMainNavigation(depth: number, force: boolean = false) {
        if (_depths.value === depth && !force) {
            return;
        }

        _depths.value = depth;
        mainNavigationElements.value = await loadNavigation('main-navigation', depth);
    }

    async function loadFooterNavigation(depth: number) {
        footerNavigationElements.value = await loadNavigation('footer-navigation', depth);
    }

    async function loadServiceNavigation(depth: number) {
        serviceNavigationElements.value = await loadNavigation('service-navigation', depth);
    }

    return {
        mainNavigationElements,
        footerNavigationElements,
        serviceNavigationElements,
        loadMainNavigation,
        loadFooterNavigation,
        loadServiceNavigation,
    };
});
