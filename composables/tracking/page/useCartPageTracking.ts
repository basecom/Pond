import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useCartPageTracking(analytics: UseAnalyticsReturn) {
    const cartItemsCountStore = useCartItemsStore();
    const navigationStore = useNavigationStore();
    const { cart } = useCart();
    const { mainNavigationElements } = storeToRefs(navigationStore);
    const { cartItemsCount } = storeToRefs(cartItemsCountStore);
    const isCartPageReady = computed(() => cart.value?.lineItems.length && !!cartItemsCount.value && !!mainNavigationElements.value.length);

    usePageTracking(analytics, 'cart');
    whenever(isCartPageReady, () => {
        analytics.trackViewCart();
    }, { immediate: true });
}
