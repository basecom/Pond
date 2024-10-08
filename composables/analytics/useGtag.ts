import type { Schemas } from '@shopware/api-client/api-types';
import type { UseAnalyticsReturn } from '../../types/analytics/analytics';
import { useEcommerceTrackingHelper } from '../tracking/useEcommerceTrackingHelper';

export function useGtags(): UseAnalyticsReturn {
    const _cookieEnabledName = 'google-analytics-enabled';
    const _cookieAdsEnabledName = 'google-ads-enabled';
    const _isLoaded = useState<boolean>('isGtagLoaded', () => false);
    // TODO: Modify to take the value from configuration
    const _isGoogleAnalyticsEnabled = ref(true);
    // TODO: Modify to take the value from configuration
    const _googleAnalyticsId = ref('G-XXXXXXX');
    const { getEventForSingleItem, getEventForAllItems, getEventWithShippingInfo, getEventWithPaymentInfo, getPurchasedEvent } =
        useEcommerceTrackingHelper();

    function _trackEvent(...args: unknown[]) {
        if (import.meta.client) {
            window.dataLayer?.push(args);
        }
    }

    const _loadGtag = () => {
        useHead({
            script: [
                {
                    src: `https://www.googletagmanager.com/gtag/js?id=${_googleAnalyticsId.value}`,
                    tagPosition: 'head',
                },
                {
                    innerHTML: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${_googleAnalyticsId.value}');
                    `,
                    tagPosition: 'head',
                },
            ],
        });
    };

    const _initialize = () => {
        if (!_isGoogleAnalyticsEnabled.value || _isLoaded.value) {
            return;
        }

        _isLoaded.value = true;
        _loadGtag();
    };

    const updateConsent = (activeCookies: string[]) => {
        if (activeCookies.includes(_cookieEnabledName)) {
            _initialize();
        }

        if (import.meta.server) {
            return;
        }

        _trackEvent('consent', 'update', {
            ad_user_data: activeCookies.includes(_cookieAdsEnabledName) ? 'granted' : 'denied',
            ad_personalization: activeCookies.includes(_cookieAdsEnabledName) ? 'granted' : 'denied',
            ad_storage: activeCookies.includes(_cookieAdsEnabledName) ? 'granted' : 'denied',
            analytics_storage: activeCookies.includes(_cookieEnabledName) ? 'granted' : 'denied',
        });
    };

    const trackAddToCart = (product: Schemas['Product'], quantity?: number) => {
        const trackingEvent = getEventForSingleItem(product, quantity);

        if (!trackingEvent) {
            return;
        }

        _trackEvent('event', 'add_to_cart', trackingEvent);
    };

    const trackRemoveFromCart = (product: Schemas['Product'], quantity?: number) => {
        const trackingEvent = getEventForSingleItem(product, quantity);

        if (!trackingEvent) {
            return;
        }

        _trackEvent('event', 'remove_from_cart', trackingEvent);
    };

    const trackViewCart = () => {
        const trackingEvent = getEventForAllItems();

        if (!trackingEvent) {
            return;
        }

        _trackEvent('event', 'view_cart', trackingEvent);
    };

    const trackBeginCheckout = () => {
        const trackingEvent = getEventForAllItems();

        if (!trackingEvent) {
            return;
        }

        _trackEvent('event', 'begin_checkout', trackingEvent);
    };

    const trackAddShippingInfo = () => {
        const trackingEvent = getEventWithShippingInfo();

        if (!trackingEvent) {
            return;
        }

        _trackEvent('event', 'add_shipping_info', trackingEvent);
    };

    const trackAddPaymentInfo = () => {
        const trackingEvent = getEventWithPaymentInfo();

        if (!trackingEvent) {
            return;
        }

        _trackEvent('event', 'add_payment_info', trackingEvent);
    };

    const trackPurchase = (order: Schemas["Order"]) => {
        const trackingEvent = getPurchasedEvent(order);

        if (!trackingEvent) {
            return;
        }

        _trackEvent('event', 'purchase', trackingEvent);
    };

    return {
        updateConsent,
        trackAddToCart,
        trackRemoveFromCart,
        trackViewCart,
        trackBeginCheckout,
        trackAddShippingInfo,
        trackAddPaymentInfo,
        trackPurchase,
    };
}
