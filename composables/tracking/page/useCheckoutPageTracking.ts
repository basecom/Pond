import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useCheckoutPageTracking(analytics: UseAnalyticsReturn) {
    const { cart } = useCart();
    const navigationStore = useNavigationStore();
    const { mainNavigationElements } = storeToRefs(navigationStore);
    const isCheckoutPageReady = computed(() => !!cart.value && !!mainNavigationElements.value.length);

    usePageTracking(analytics, 'checkout');

    whenever(
        isCheckoutPageReady,
        () => {
            analytics.trackBeginCheckout();
        },
        { once: true, immediate: true },
    );
}
