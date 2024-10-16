import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useProductDetailPageTracking(analytics: UseAnalyticsReturn) {
    const { product } = useProduct();
    const _initialTrackingDone = ref(false);
    const { loading } = storeToRefs(useCustomerStore());

    const unwatch = watch(product, () => {
        if (_initialTrackingDone.value) {
            unwatch();
            return;
        }

        if (!product.value) {
            return;
        }

        _initialTrackingDone.value = true;
        analytics.trackViewItem(product.value);
    }, { immediate: true });

    watchEffect(() => {
        if (loading.value) {
            return;
        }
        analytics.trackPage('product');
    });
}