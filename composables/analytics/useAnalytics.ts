import type { PondAnalyticsType, UseAnalyticsConfig, UseAnalyticsReturn } from '../../types/analytics/analytics';

export function useAnalytics(config?: UseAnalyticsConfig): UseAnalyticsReturn {
    const analyticsConfig = useAnalyticsConfig();
    const type = analyticsConfig.type.value as PondAnalyticsType;
    const analytics: UseAnalyticsReturn = {
        gtag: useGtags,
        gtm: useGtm,
    }[type]();

    if (config?.trackPageView) {
        const pageTracker: Record<UseAnalyticsConfig['pageType'], (analytics: UseAnalyticsReturn, type: UseAnalyticsConfig['pageType']) => void> = {
            cart: useCartPageTracking,
            checkout: useCheckoutPageTracking,
            landingpage: usePageTracking,
            plp: useProductListPageTracking,
            pdp: useProductDetailPageTracking,
            search: useProductListPageTracking,
            wishlist: usePageTracking,
            finish: usePageTracking,
            editOrder: usePageTracking,
            accountAddress: usePageTracking,
            account: usePageTracking,
            login: usePageTracking,
            register: usePageTracking,
            accountOrders: usePageTracking,
            accountPayment: usePageTracking,
            accountProfile: usePageTracking,
        };

        pageTracker[config.pageType](analytics, config.pageType);
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
        trackPage: analytics.trackPage,
        setUserId: analytics.setUserId,
        isPageTrackingReady: analytics.isPageTrackingReady,
    };
}
