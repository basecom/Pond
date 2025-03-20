import type { Schemas } from '@shopware/api-client/api-types';
import type { UseAnalyticsReturn } from '~/types/analytics/Analytics';
import type { TrackingLineItemList } from '../tracking/useItemTracking';
import type { PromotionInfo } from '~/types/analytics/Promotion';

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
        getEventForProductsWithPrice,
    } = useEcommerceTrackingHelper();
    const { getSearchEvent, getSearchSuggestionEvent } = useSearchTrackingHelper();
    const { getPageTrackingEvent, isPageTrackingReady } = usePageTrackingHelper();
    const { getTrackingPromotionEvent } = usePromotionTracking();
    const sessionId = useState<string | undefined>('pondSessionId');

    function _trackEvent() {
        if (import.meta.client) {
            window.dataLayer = window.dataLayer || [];
            // eslint-disable-next-line prefer-rest-params
            window.dataLayer?.push(arguments);
        }
    }

    const _getSessionId = async (tagId: string): Promise<string | undefined> =>
        new Promise(resolve => {
            const timeout = setTimeout(() => {
                resolve(undefined);
            }, 500);

            if (typeof gtag === 'function') {
                gtag?.('get', tagId, 'session_id', (currentSessionId: string) => {
                    clearTimeout(timeout);
                    resolve(currentSessionId);
                });
            }
        });

    const _loadSessionId = async () => {
        if (import.meta.server) {
            return;
        }

        sessionId.value = await _getSessionId(id.value);
    };

    const _loadGtag = () => {
        useHead({
            script: [
                {
                    innerHTML: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('consent', 'default', {
                            'ad_storage': 'denied',
                            'ad_user_data': 'denied',
                            'ad_personalization': 'denied',
                            'analytics_storage': 'denied'
                        });
                    `,
                    tagPosition: 'head',
                },
                {
                    src: `https://www.googletagmanager.com/gtag/js?id=${id.value}`,
                    tagPosition: 'head',
                },
                {
                    innerHTML: `
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

        _loadSessionId();
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

    const trackSelectItem = (product: Schemas['Product'], list?: TrackingLineItemList) => {
        const trackingEvent = getEventForProduct(product, list);

        _trackEvent('event', 'select_item', trackingEvent);
    };

    const trackViewItem = (product: Schemas['Product']) => {
        const trackingEvent = getEventForProductWithPrice(product);

        _trackEvent('event', 'view_item', trackingEvent);
    };

    const trackPage = (pageType: string) => {
        const trackingEvent = getPageTrackingEvent(pageType, sessionId.value);

        _trackEvent('event', 'page_meta', trackingEvent);
    };

    const setUserId = (userId: string) => {
        _trackEvent('config', id.value, { user_id: userId });
    };

    const trackSearchSuggestions = () => {
        const trackingEvent = getSearchSuggestionEvent();

        _trackEvent('event', 'search_suggest', trackingEvent);
    };

    const trackSearch = () => {
        const trackingEvent = getSearchEvent();

        _trackEvent('event', 'search', trackingEvent);
    };

    const trackAddToWishlist = (product: Schemas['Product']) => {
        const trackingEvent = getEventForProductWithPrice(product);

        _trackEvent('event', 'add_to_wishlist', trackingEvent);
    };

    const trackRemoveFromWishlist = (product: Schemas['Product']) => {
        const trackingEvent = getEventForProductWithPrice(product);

        _trackEvent('event', 'remove_from_wishlist', trackingEvent);
    };

    const trackClearWishlist = (products: Schemas['Product'][]) => {
        const trackingEvent = getEventForProductsWithPrice(products);

        _trackEvent('event', 'remove_from_wishlist', trackingEvent);
    };

    const trackLogin = () => {
        _trackEvent('event', 'login');
    };

    const trackRegister = () => {
        _trackEvent('event', 'registration');
    };

    const trackNavigation = (level: number, name: string) => {
        _trackEvent('event', 'navigation_header', {
            navigation_level: level,
            navigation_name: name,
        });
    };

    const trackSelectPromotion = (promotion: PromotionInfo, product?: Schemas['Product'], indexOfProduct?: number) => {
        const promotionEvent = getTrackingPromotionEvent(promotion, product, indexOfProduct);

        _trackEvent('event', 'select_promotion', promotionEvent);
    };

    const trackPromotionView = (promotion: PromotionInfo, product?: Schemas['Product'], indexOfProduct?: number) => {
        const promotionEvent = getTrackingPromotionEvent(promotion, product, indexOfProduct);

        _trackEvent('event', 'view_promotion', promotionEvent);
    };

    const trackNewsletterRegistration = () => {
        _trackEvent('event', 'newsletter_registration');
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
        trackViewItem,
        trackSelectItem,
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
        trackSelectPromotion,
        trackPromotionView,
        trackNewsletterRegistration,
    };
}
