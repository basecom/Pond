import type { NavigationType, NavigationInstance } from '~/types/navigation/Navigation';
import type { Schemas } from '@shopware/api-client/api-types';

export const useNavigationStore = defineStore('navigation', () => {
    const navigationTypes: NavigationType[] = ['main-navigation', 'footer-navigation', 'service-navigation'];

    const instances = {} as Record<NavigationType, NavigationInstance>;
    const storedDepths = {} as Record<NavigationType, Ref<number>>;
    const navigationElements = {}  as Record<NavigationType, ComputedRef<Schemas['NavigationRouteResponse'] | null>>;

    // Track pending requests to avoid duplicates when the store is being accessed multiple times while being empty
    const pendingRequests = {} as Record<string, Promise<Schemas['NavigationRouteResponse']> | null>;

    navigationTypes.forEach(type => {
        instances[type] = useNavigation({ type });
        storedDepths[type] = ref(0);
        navigationElements[type] = instances[type].navigationElements;
    });

    const loadNavigation = async (type: NavigationType, depth: number, force: boolean = false) => {
        if (!navigationTypes.includes(type)) {
            console.error(`[NavigationStore] Invalid navigation type: ${type}`);
            return [];
        }

        const requestKey = `${type}-${depth}`;

        // Return existing pending request if one exists
        if (pendingRequests[requestKey]) {
            return pendingRequests[requestKey];
        }

        // Check if we already have sufficient data
        const shouldFetch = force || !navigationElements[type].value?.length || depth > storedDepths[type].value;
        if (!shouldFetch) {
            return navigationElements[type].value;
        }

        // Create a new promise for this request
        pendingRequests[requestKey] = (async () => {
            try {
                const result = await instances[type].loadNavigationElements({ depth });

                if (depth > storedDepths[type].value) {
                    storedDepths[type].value = depth;
                }

                return result;
            } catch (error) {
                console.error(`[NavigationStore][loadNavigation] Error loading ${type}:`, import.meta.dev ? error : '');
                return [];
            } finally {
                // Clear the pending request after it completes
                pendingRequests[requestKey] = null;
            }
        })();

        return pendingRequests[requestKey];
    };

    return {
        mainNavigation: navigationElements['main-navigation'],
        footerNavigation: navigationElements['footer-navigation'],
        serviceNavigation: navigationElements['service-navigation'],
        loadNavigation,
    };
});
