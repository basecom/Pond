import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useCartPageTracking(analytics: UseAnalyticsReturn) {
    const cartItemsCountStore = useCartItemsStore();
    const navigationStore = useNavigationStore();
    const { mainNavigationElements } = storeToRefs(navigationStore);
    const { cartItemsCount } = storeToRefs(cartItemsCountStore);

    watchEffect(() => {
        if (!cartItemsCount.value || !mainNavigationElements.value.length) {
            return;
        }

        setTimeout(() => analytics.trackViewCart());
    });
}
