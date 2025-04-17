import type { Schemas } from '@shopware/api-client/api-types';

export type NavigationType = 'main-navigation' | 'footer-navigation' | 'service-navigation';

export interface NavigationInstance {
    navigationElements: ComputedRef<Schemas['NavigationRouteResponse'] | null>;
    loadNavigationElements(params: { depth: number }): Promise<Schemas['NavigationRouteResponse']>;
}
