import type { UseAnalyticsReturn } from '~/types/analytics/Analytics';

export function useCartPageTracking(analytics: UseAnalyticsReturn) {
    const navigationStore = useNavigationStore();
    const { mainNavigation } = storeToRefs(navigationStore);

    const cartItemsCountStore = useCartItemsStore();
    const { cart } = useCart();
    const { cartItemsCount } = storeToRefs(cartItemsCountStore);
    const isCartPageReady = computed(
        () => cart.value?.lineItems.length && !!cartItemsCount.value && !!mainNavigation.value?.length,
    );

    usePageTracking(analytics, 'cart');
    whenever(
        isCartPageReady,
        () => {
            analytics.trackViewCart();
        },
        { immediate: true },
    );
}
