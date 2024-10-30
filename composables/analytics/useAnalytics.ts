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
            navigation: useNavigationPageTracking,
            pdp: useProductDetailPageTracking,
            search: useSearchPageTracking,
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
        isPageTrackingReady: analytics.isPageTrackingReady,
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
        trackSearchSuggestions: analytics.trackSearchSuggestions,
        trackSearch: analytics.trackSearch,
        trackAddToWishlist: analytics.trackAddToWishlist,
        trackRemoveFromWishlist: analytics.trackRemoveFromWishlist,
        trackLogin: analytics.trackLogin,
        trackRegister: analytics.trackRegister,
        trackNavigation: analytics.trackNavigation,
        trackSelectPromotion: analytics.trackSelectPromotion,
        trackPromotionView: analytics.trackPromotionView,
        trackNewsletterRegistration: analytics.trackNewsletterRegistration,
    };
}
