import type { Schemas } from '@shopware/api-client/api-types';

export type UseAnalyticsConfig = {
    trackPageView: boolean;
    pageType:
        | 'cart'
        | 'checkout'
        | 'landingpage'
        | 'pdp'
        | 'plp'
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
    trackSelectItem: (product: Schemas['Product']) => void;
    trackViewItem: (product: Schemas['Product']) => void;
    trackPage: (pageType: string) => void;
    setUserId: (userId: string) => void;
    isPageTrackingReady: ComputedRef<boolean>;
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