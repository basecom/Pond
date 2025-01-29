import type { Schemas } from '@shopware/api-client/api-types';
import type { UseAnalyticsReturn } from '../../types/analytics/analytics';
import type { PromotionInfo } from '../../types/analytics/promotion';
import type { TrackingLineItemList } from '../tracking/useItemTracking';

export function useGtm(): UseAnalyticsReturn {
    const _cookieEnabledName = 'google-analytics-enabled';
    const _cookieAdsEnabledName = 'google-ads-enabled';
    const _isLoaded = useState<boolean>('isGtmLoaded', () => false);
    const { isEnabled, id, trackingUrl } = useAnalyticsConfig();
    const {
        getEventWithShippingInfo,
        getEventForAllItems,
        getEventForSingleItem,
        getEventWithPaymentInfo,
        getPurchasedEvent,
        getEventForProductList,
        getEventForProduct,
        getEventForProductWithPrice,
        getEventForProductsWithPrice,
    } = useEcommerceTrackingHelper();
    const { getSearchEvent, getSearchSuggestionEvent } = useSearchTrackingHelper();
    const { getPageTrackingEvent, isPageTrackingReady } = usePageTrackingHelper();
    const { getTrackingPromotionEvent } = usePromotionTracking();
    const sessionId = useState<string | undefined>('pondSessionId');

    const _trackEvent = (args: unknown) => {
        if (import.meta.client) {
            window.dataLayer?.push(args);
        }
    };

    const _getSessionId = async (tagId: string): Promise<string | undefined> =>
        new Promise(resolve => {
            const timeout = setTimeout(() => {
                resolve(undefined);
            }, 500);

            gtag('get', tagId, 'session_id', (currentSessionId: string) => {
                clearTimeout(timeout);
                resolve(currentSessionId);
            });
        });

    const _loadSessionId = async () => {
        if (import.meta.server) {
            return;
        }

        const googleTagManagerData = window['google_tag_manager'];

        if (!googleTagManagerData) {
            return;
        }

        const keys = Object.keys(googleTagManagerData);
        const googleAnalyticsTagId = keys.find(key => key.startsWith('G-'));

        if (!googleAnalyticsTagId) {
            return;
        }

        sessionId.value = await _getSessionId(googleAnalyticsTagId);
    };

    const _loadGtm = () => {
        if (_isLoaded.value) {
            return;
        }

        const trackingUrlHref = trackingUrl.value ?? 'https://www.googletagmanager.com/';

        if (!id.value || !isEnabled.value) {
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
                        })(window,document,'script','dataLayer','${id.value}', '${trackingUrlHref}');
                        <!-- End Google Tag Manager -->
                    `,
                    tagPosition: 'head',
                },
                {
                    innerHTML: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                    `,
                    tagPosition: 'head',
                },
            ],
            noscript: [
                {
                    innerHTML: `<!-- Google Tag Manager (noscript) -->
                        <iframe src="${trackingUrlHref}ns.html?id=${id.value}"
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

        _loadSessionId();
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

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'view_cart',
            ecommerce: trackingEvent,
        });
    };

    const trackBeginCheckout = () => {
        const trackingEvent = getEventForAllItems();

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'begin_checkout',
            ecommerce: trackingEvent,
        });
    };

    const trackAddShippingInfo = () => {
        const trackingEvent = getEventWithShippingInfo();

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'add_shipping_info',
            ecommerce: trackingEvent,
        });
    };

    const trackAddPaymentInfo = () => {
        const trackingEvent = getEventWithPaymentInfo();

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'add_payment_info',
            ecommerce: trackingEvent,
        });
    };

    const trackPurchase = (order: Schemas['Order']) => {
        const trackingEvent = getPurchasedEvent(order);

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'purchase',
            ecommerce: trackingEvent,
        });
    };

    const trackViewItemList = (products: Schemas['Product'][], page?: number) => {
        const trackingEvent = getEventForProductList(products);

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'view_item_list',
            pagination: page ?? 1,
            ecommerce: trackingEvent,
        });
    };

    const trackSelectItem = (product: Schemas['Product'], list?: TrackingLineItemList) => {
        const trackingEvent = getEventForProduct(product, list);

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'select_item',
            ecommerce: trackingEvent,
        });
    };

    const trackViewItem = (product: Schemas['Product']) => {
        const trackingEvent = getEventForProductWithPrice(product);

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'view_item',
            ecommerce: trackingEvent,
        });
    };

    const trackPage = (pageType: string) => {
        const trackingEvent = getPageTrackingEvent(pageType, sessionId.value);

        _trackEvent({
            event: 'page_meta',
            page: trackingEvent,
        });
    };

    const setUserId = (userId: string) => {
        _trackEvent({
            user_id: userId,
        });
    };

    const trackSearchSuggestions = () => {
        const trackingEvent = getSearchSuggestionEvent();

        _trackEvent({ event: 'search_suggest', ...trackingEvent });
    };

    const trackSearch = () => {
        const trackingEvent = getSearchEvent();

        _trackEvent({ event: 'search', ...trackingEvent });
    };

    const trackAddToWishlist = (product: Schemas['Product']) => {
        const trackingEvent = getEventForProductWithPrice(product);

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'add_to_wishlist',
            ecommerce: trackingEvent,
        });
    };

    const trackRemoveFromWishlist = (product: Schemas['Product']) => {
        const trackingEvent = getEventForProductWithPrice(product);

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'remove_from_wishlist',
            ecommerce: trackingEvent,
        });
    };

    const trackClearWishlist = (products: Schemas['Product'][]) => {
        const trackingEvent = getEventForProductsWithPrice(products);

        _trackEvent({ ecommerce: null });
        _trackEvent({
            event: 'remove_from_wishlist',
            ecommerce: trackingEvent,
        });
    };

    const trackLogin = () => {
        _trackEvent({
            event: 'login',
        });
    };

    const trackRegister = () => {
        _trackEvent({
            event: 'registration',
        });
    };

    const trackNavigation = (level: number, name: string) => {
        _trackEvent({
            event: 'navigation_header',
            navigation_level: level,
            navigation_name: name,
        });
    };

    const trackPromotionView = (promotion: PromotionInfo, product?: Schemas['Product'], indexOfProduct?: number) => {
        const promotionEvent = getTrackingPromotionEvent(promotion, product, indexOfProduct);

        _trackEvent({
            event: 'view_promotion',
            ...promotionEvent,
        });
    };

    const trackSelectPromotion = (promotion: PromotionInfo, product?: Schemas['Product'], indexOfProduct?: number) => {
        const promotionEvent = getTrackingPromotionEvent(promotion, product, indexOfProduct);

        _trackEvent({
            event: 'select_promotion',
            ...promotionEvent,
        });
    };

    const trackNewsletterRegistration = () => {
        _trackEvent({
            event: 'newsletter_registration',
        });
    };

    return {
        isPageTrackingReady,
        updateConsent,
        trackAddToCart,
        trackRemoveFromCart,
        trackViewCart,
        trackBeginCheckout,
        trackAddShippingInfo,
        trackAddPaymentInfo,
        trackPurchase,
        trackViewItemList,
        trackSelectItem,
        trackViewItem,
        trackPage,
        setUserId,
        trackSearchSuggestions,
        trackSearch,
        trackAddToWishlist,
        trackRemoveFromWishlist,
        trackClearWishlist,
        trackLogin,
        trackRegister,
        trackNavigation,
        trackPromotionView,
        trackSelectPromotion,
        trackNewsletterRegistration,
    };
}
