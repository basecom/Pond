import type { Schemas } from '@shopware/api-client/api-types';
import type { UseAnalyticsReturn } from '../../types/analytics/analytics';

export function useGtags(): UseAnalyticsReturn {
    const _cookieEnabledName = 'google-analytics-enabled';
    const _cookieAdsEnabledName = 'google-ads-enabled';
    const _isLoaded = useState<boolean>('isGtagLoaded', () => false);
    const { isEnabled, id } = useAnalyticsConfig();
    const {
        getEventForSingleItem,
        getEventForAllItems,
        getEventWithShippingInfo,
        getEventWithPaymentInfo,
        getPurchasedEvent,
        getEventForProductList,
        getEventForProduct,
        getEventForProductWithPrice,
    } = useEcommerceTrackingHelper();

    function _trackEvent(...args: unknown[]) {
        if (import.meta.client) {
            window.dataLayer?.push(args);
        }
    }

    const _loadGtag = () => {
        useHead({
            script: [
                {
                    src: `https://www.googletagmanager.com/gtag/js?id=${id.value}`,
                    tagPosition: 'head',
                },
                {
                    innerHTML: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${id.value}');
                    `,
                    tagPosition: 'head',
                },
            ],
        });
    };

    const _initialize = () => {
        if (!isEnabled.value || _isLoaded.value) {
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

        _trackEvent('event', 'view_cart', trackingEvent);
    };

    const trackBeginCheckout = () => {
        const trackingEvent = getEventForAllItems();

        _trackEvent('event', 'begin_checkout', trackingEvent);
    };

    const trackAddShippingInfo = () => {
        const trackingEvent = getEventWithShippingInfo();

        _trackEvent('event', 'add_shipping_info', trackingEvent);
    };

    const trackAddPaymentInfo = () => {
        const trackingEvent = getEventWithPaymentInfo();

        _trackEvent('event', 'add_payment_info', trackingEvent);
    };

    const trackPurchase = (order: Schemas['Order']) => {
        const trackingEvent = getPurchasedEvent(order);

        _trackEvent('event', 'purchase', trackingEvent);
    };

    const trackViewItemList = (products: Schemas['Product'][]) => {
        const trackingEvent = getEventForProductList(products);

        _trackEvent('event', 'view_item_list', trackingEvent);
    };

    const trackSelectItem = (product: Schemas['Product']) => {
        const trackingEvent = getEventForProduct(product);

        _trackEvent('event', 'select_item', trackingEvent);
    }

    const trackViewItem = (product: Schemas['Product']) => {
        const trackingEvent = getEventForProductWithPrice(product);

        _trackEvent('event', 'view_item', trackingEvent);
    }

    return {
        updateConsent,
        trackAddToCart,
        trackRemoveFromCart,
        trackViewCart,
        trackBeginCheckout,
        trackAddShippingInfo,
        trackAddPaymentInfo,
        trackPurchase,
        trackViewItemList,
        trackViewItem,
        trackSelectItem,
    };
}
