import type { PondAnalyticsType, UseAnalyticsConfig, UseAnalyticsReturn } from '../../types/analytics/analytics';

export function useAnalytics(config?: UseAnalyticsConfig): UseAnalyticsReturn {
    const runtimeConfig = useRuntimeConfig();
    const type = runtimeConfig.public.pond.analytics.type as PondAnalyticsType;
    const analytics: UseAnalyticsReturn = {
        gtag: useGtags,
        gtm: useGtm,
    }[type]();

    if (config?.trackPageView) {
        const pageTracker: Record<UseAnalyticsConfig['pageType'], (analytics: UseAnalyticsReturn) => void> = {
            cart: useCartPageTracking,
            checkout: useCheckoutPageTracking,
        };

        pageTracker[config.pageType](analytics);
    }

    return {
        updateConsent: analytics.updateConsent,
        trackAddToCart: analytics.trackAddToCart,
        trackRemoveFromCart: analytics.trackRemoveFromCart,
        trackViewCart: analytics.trackViewCart,
        trackBeginCheckout: analytics.trackBeginCheckout,
        trackAddShippingInfo: analytics.trackAddShippingInfo,
        trackAddPaymentInfo: analytics.trackAddPaymentInfo,
        trackPurchase: analytics.trackPurchase,
    };
}