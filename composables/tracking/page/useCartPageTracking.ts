import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useCartPageTracking(analytics: UseAnalyticsReturn) {
    const cartItemsCountStore = useCartItemsStore();
    const navigationStore = useNavigationStore();
    const { mainNavigationElements } = storeToRefs(navigationStore);
    const { cartItemsCount } = storeToRefs(cartItemsCountStore);
    const isCartPageReady = computed(() => !!cartItemsCount.value && !!mainNavigationElements.value.length);

    usePageTracking(analytics, 'cart');
    whenever(isCartPageReady, () => {
        setTimeout(() => analytics.trackViewCart());
    }, { immediate: true });
}
