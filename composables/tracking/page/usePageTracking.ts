import type { UseAnalyticsConfig, UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function usePageTracking(analytics: UseAnalyticsReturn, pageType: UseAnalyticsConfig['pageType']) {
    const { loading } = storeToRefs(useCustomerStore());

    watchEffect(() => {
        if (loading.value) {
            return;
        }
        analytics.trackPage(pageType);
    });
}