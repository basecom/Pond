import type { PondAnalyticsType, UseAnalyticsConfig, UseAnalyticsReturn } from '../../types/analytics/analytics';

export function useAnalytics(config?: UseAnalyticsConfig): UseAnalyticsReturn {
    const analyticsConfig = useAnalyticsConfig();
    const type = analyticsConfig.type.value as PondAnalyticsType;
    const analytics: UseAnalyticsReturn = {
        gtag: useGtags,
        gtm: useGtm,
    }[type]();

    if (config?.trackPageView) {
        const pageTracker: Record<UseAnalyticsConfig['pageType'], (analytics: UseAnalyticsReturn) => void> = {
            cart: useCartPageTracking,
            checkout: useCheckoutPageTracking,
            cms: useCmsPageTracking,
            pdp: useProductDetailPageTracking,
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
        trackViewItemList: analytics.trackViewItemList,
        trackSelectItem: analytics.trackSelectItem,
        trackViewItem: analytics.trackViewItem,
        trackAddToWishlist: analytics.trackAddToWishlist,
        trackRemoveFromWishlist: analytics.trackRemoveFromWishlist,
    };
}
