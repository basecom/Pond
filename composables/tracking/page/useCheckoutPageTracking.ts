import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useCheckoutPageTracking(analytics: UseAnalyticsReturn) {
    const { cart } = useCart();
    const navigationStore = useNavigationStore();
    const { mainNavigationElements } = storeToRefs(navigationStore);
    const _checkoutTracked = ref(false);
    const { loading } = storeToRefs(useCustomerStore());

    const unwatch = watch([cart, mainNavigationElements], () => {
        if (_checkoutTracked.value) {
            unwatch();
            return;
        }

        if (!cart.value || !mainNavigationElements.value.length) {
            return;
        }

        _checkoutTracked.value = true;
        analytics.trackBeginCheckout();
    }, { immediate: true });

    watchEffect(() => {
        if (loading.value) {
            return;
        }
        analytics.trackPage('checkout');
    });
}
