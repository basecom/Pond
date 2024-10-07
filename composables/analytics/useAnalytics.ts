import type { PondAnalyticsType, UseAnalyticsReturn } from '../../types/analytics/analytics';

export function useAnalytics(): UseAnalyticsReturn {
    const runtimeConfig = useRuntimeConfig();
    const type = runtimeConfig.public.pond.analytics.type as PondAnalyticsType;
    const analytics: UseAnalyticsReturn = {
        gtag: useGtags,
        gtm: useGtm,
    }[type]();

    return {
        updateConsent: analytics.updateConsent,
        trackAddToCart: analytics.trackAddToCart,
        trackRemoveFromCart: analytics.trackRemoveFromCart,
        trackViewCart: analytics.trackViewCart,
    };
}
