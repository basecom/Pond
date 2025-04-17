import type { UseAnalyticsReturn } from '~/types/analytics/Analytics';

export function useCheckoutPageTracking(analytics: UseAnalyticsReturn) {
    const navigationStore = useNavigationStore();
    const { mainNavigation } = storeToRefs(navigationStore);

    const { cart } = useCart();
    const isCheckoutPageReady = computed(() => !!cart.value && !!mainNavigation.value?.length);

    usePageTracking(analytics, 'checkout');

    whenever(
        isCheckoutPageReady,
        () => {
            analytics.trackBeginCheckout();
        },
        { once: true, immediate: true },
    );
}
