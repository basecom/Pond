import type { Schemas } from '@shopware/api-client/api-types';
import type { UseAnalyticsReturn } from '../../types/analytics/analytics';

export function useGtm(): UseAnalyticsReturn {
    const _cookieEnabledName = 'google-analytics-enabled';
    const _cookieAdsEnabledName = 'google-ads-enabled';
    const _isLoaded = useState<boolean>('isGtmLoaded', () => false);
    // TODO: Modify to take the value from configuration
    const _isGoogleAnalyticsEnabled = ref(true);
    const runtimeConfig = useRuntimeConfig();
    const { getEventWithShippingInfo, getEventForAllItems, getEventForSingleItem, getEventWithPaymentInfo, getPurchasedEvent } =
        useEcommerceTrackingHelper();

    const _trackEvent = (args: unknown) => {
        if (import.meta.client) {
            window.dataLayer?.push(args);
        }
    };

    const _loadGtm = () => {
        if (_isLoaded.value) {
            return;
        }

        const id = runtimeConfig.public.pond.analytics.id;
        const trackingUrl = runtimeConfig.public.pond.analytics.trackingUrl ?? 'https://www.googletagmanager.com/';

        if (!id || !_isGoogleAnalyticsEnabled.value) {
            return;
        }

        useHead({
            script: [
                {
                    innerHTML: `
                        <!-- Google Tag Manager -->
                        (function(w,d,s,l,i,u){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        u+'gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${id}', '${trackingUrl}');
                        <!-- End Google Tag Manager -->
                    `,
                    tagPosition: 'head',
                },
            ],
            noscript: [
                {
                    innerHTML: `<!-- Google Tag Manager (noscript) -->
                        <iframe src="${trackingUrl}ns.html?id=${id}"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>
                        <!-- End Google Tag Manager (noscript) -->
                    `,
                    tagPosition: 'bodyOpen',
                },
            ],
        });
        _isLoaded.value = true;
    };

    const updateConsent = (activeCookies: string[]) => {
        if (import.meta.server) {
            _loadGtm();

            return;
        }

        _trackEvent([
            'consent',
            'update',
            {
                ad_user_data: activeCookies.includes(_cookieAdsEnabledName) ? 'granted' : 'denied',
                ad_personalization: activeCookies.includes(_cookieAdsEnabledName) ? 'granted' : 'denied',
                ad_storage: activeCookies.includes(_cookieAdsEnabledName) ? 'granted' : 'denied',
                analytics_storage: activeCookies.includes(_cookieEnabledName) ? 'granted' : 'denied',
            },
        ]);
    };

    const trackAddToCart = (product: Schemas['Product'], quantity?: number) => {
        const trackingEvent = getEventForSingleItem(product, quantity);

        if (!trackingEvent) {
            return;
        }

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'add_to_cart',
            ecommerce: trackingEvent,
        });
    };

    const trackRemoveFromCart = (product: Schemas['Product'], quantity?: number) => {
        const trackingEvent = getEventForSingleItem(product, quantity);

        if (!trackingEvent) {
            return;
        }

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'remove_from_cart',
            ecommerce: trackingEvent,
        });
    };

    const trackViewCart = () => {
        const trackingEvent = getEventForAllItems();

        if (!trackingEvent) {
            return;
        }

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'view_cart',
            ecommerce: trackingEvent,
        });
    };

    const trackBeginCheckout = () => {
        const trackingEvent = getEventForAllItems();

        if (!trackingEvent) {
            return;
        }

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'begin_checkout',
            ecommerce: trackingEvent,
        });
    };

    const trackAddShippingInfo = () => {
        const trackingEvent = getEventWithShippingInfo();

        if (!trackingEvent) {
            return;
        }

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'add_shipping_info',
            ecommerce: trackingEvent,
        });
    };

    const trackAddPaymentInfo = () => {
        const trackingEvent = getEventWithPaymentInfo();

        if (!trackingEvent) {
            return;
        }

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'add_payment_info',
            ecommerce: trackingEvent,
        });
    };

    const trackPurchase = (order: Schemas['Order']) => {
        const trackingEvent = getPurchasedEvent(order);

        if (!trackingEvent) {
            return;
        }

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'purchase',
            ecommerce: trackingEvent,
        });
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
    };
}
