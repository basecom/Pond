import type { Schemas } from '@shopware/api-client/api-types';

export type UseAnalyticsConfig = {
    trackPageView: boolean;
    pageType: 'cart' | 'checkout' | 'cms' | 'pdp';
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
    trackLogin: () => void;
    trackRegister: () => void;
};

export type PondAnalyticsType = 'gtm' | 'gtag';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer?: any[];
    }
}
