import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useCartPageTracking(analytics: UseAnalyticsReturn) {
    const cartItemsCountStore = useCartItemsStore();
    const navigationStore = useNavigationStore();
    const { mainNavigationElements } = storeToRefs(navigationStore);
    const { cartItemsCount } = storeToRefs(cartItemsCountStore);
    const { loading } = storeToRefs(useCustomerStore());

    watchEffect(() => {
        if (!cartItemsCount.value || !mainNavigationElements.value.length) {
            return;
        }

        setTimeout(() => analytics.trackViewCart());
    });

    watchEffect(() => {
        if (loading.value) {
            return;
        }
        analytics.trackPage('cart');
    });
}
