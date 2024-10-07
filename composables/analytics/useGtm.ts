import type { Schemas } from '@shopware/api-client/api-types';
import type { UseAnalyticsReturn } from '../../types/analytics/analytics';
import { useCartTrackingHelper } from '../tracking/useCartTrackingHelper';

export function useGtm(): UseAnalyticsReturn {
    const _cookieEnabledName = 'google-analytics-enabled';
    const _cookieAdsEnabledName = 'google-ads-enabled';
    const _isLoaded = useState<boolean>('isGtmLoaded', () => false);
    // TODO: Modify to take the value from configuration
    const _isGoogleAnalyticsEnabled = ref(true);
    const runtimeConfig = useRuntimeConfig();
    const { getCartTrackEventForSingleItem, getCartTrackEventForMultipleItems } = useCartTrackingHelper();

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

        if (!id || !_isGoogleAnalyticsEnabled.value) {
            return;
        }

        useHead({
            script: [
                {
                    innerHTML: `
                        <!-- Google Tag Manager -->
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${id}');
                        <!-- End Google Tag Manager -->
                    `,
                    tagPosition: 'head',
                },
            ],
            noscript: [
                {
                    innerHTML: `<!-- Google Tag Manager (noscript) -->
                        <iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>
                        <!-- End Google Tag Manager (noscript) -->
                    `,
                    tagPosition: 'bodyClose',
                },
            ],
        });
        _isLoaded.value = true;
    };

    const updateConsent = (activeCookies: string[]) => {
        if (activeCookies.includes(_cookieEnabledName)) {
            _loadGtm();
        }

        if (import.meta.server) {
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

    const trackAddToCart = (cart: Schemas['Cart'], product: Schemas['Product'], quantity?: number) => {
        const trackingEvent = getCartTrackEventForSingleItem(cart, product, quantity);

        if (!trackingEvent) {
            return;
        }

        _trackEvent({
            event: 'add_to_cart',
            ecommerce: trackingEvent,
        });
    };

    const trackRemoveFromCart = (cart: Schemas['Cart'], product: Schemas['Product'], quantity?: number) => {
        const trackingEvent = getCartTrackEventForSingleItem(cart, product, quantity);

        if (!trackingEvent) {
            return;
        }

        _trackEvent({
            event: 'remove_from_cart',
            ecommerce: trackingEvent,
        });
    };

    const trackViewCart = (cart: Schemas['Cart'], products: Schemas['Product'][]) => {
        const trackingEvent = getCartTrackEventForMultipleItems(cart, products);

        if (!trackingEvent) {
            return;
        }

        _trackEvent({
            event: 'view_cart',
            ecommerce: trackingEvent,
        });
    };

    return {
        updateConsent,
        trackAddToCart,
        trackRemoveFromCart,
        trackViewCart,
    };
}
