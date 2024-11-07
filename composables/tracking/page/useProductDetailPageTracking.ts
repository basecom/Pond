import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useProductDetailPageTracking(analytics: UseAnalyticsReturn) {
    const { product } = useProduct();
    const isProductPageReady = computed(() => !!product.value);

    usePageTracking(analytics, 'product');
    whenever(
        isProductPageReady,
        () => {
            analytics.trackViewItem(product.value);
        },
        { once: true, immediate: true },
    );
}
