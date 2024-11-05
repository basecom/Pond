import type { Schemas } from '@shopware/api-client/api-types';
import type { TrackingLineItemList } from '../../composables/tracking/useItemTracking';
import type { PromotionInfo } from './promotion';

export type UseAnalyticsConfig = {
    trackPageView: boolean;
    pageType:
        | 'cart'
        | 'checkout'
        | 'landingpage'
        | 'pdp'
        | 'navigation'
        | 'search'
        | 'wishlist'
        | 'finish'
        | 'editOrder'
        | 'accountAddress'
        | 'account'
        | 'login'
        | 'register'
        | 'accountOrders'
        | 'accountPayment'
        | 'accountProfile';
};

export type UseAnalyticsReturn = {
    updateConsent: (activeCookies: string[]) => void;
    trackAddToCart: (product: Schemas['Product'], quantity?: number) => void;
    trackRemoveFromCart: (product: Schemas['Product'], quantity?: number) => void;
    trackViewCart: () => void;
    trackBeginCheckout: () => void;
    trackAddShippingInfo: () => void;
    trackAddPaymentInfo: () => void;
    trackPurchase: (order: Schemas['Order']) => void;
    trackViewItemList: (products: Schemas['Product'][], page?: number) => void;
    trackSelectItem: (product: Schemas['Product'], list?: TrackingLineItemList) => void;
    trackViewItem: (product: Schemas['Product']) => void;
    trackPage: (pageType: string) => void;
    setUserId: (userId: string) => void;
    isPageTrackingReady: ComputedRef<boolean>;
    trackSearchSuggestions: () => void;
    trackSearch: () => void;
    trackAddToWishlist: (product: Schemas['Product']) => void;
    trackRemoveFromWishlist: (product: Schemas['Product']) => void;
    trackClearWishlist: (products: Schemas['Product'][]) => void;
    trackLogin: () => void;
    trackRegister: () => void;
    trackNavigation: (level: number, name: string) => void;
    trackPromotionView: (promotion: PromotionInfo, product?: Schemas['Product'], indexOfProduct?: number) => void;
    trackSelectPromotion: (promotion: PromotionInfo, product?: Schemas['Product'], indexOfProduct?: number) => void;
    trackNewsletterRegistration: () => void;
};

export type PondAnalyticsType = 'gtm' | 'gtag';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer?: any[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        google_tag_manager?: any;
    }

    declare function gtag(...args: unknown[]): void;
}
