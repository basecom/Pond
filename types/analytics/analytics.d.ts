import type { Schemas } from '@shopware/api-client/api-types';

export type UseAnalyticsReturn = {
    updateConsent: (activeCookies: string[]) => void;
    trackAddToCart: (cart: Schemas['Cart'], product: Schemas['Product'], quantity?: number) => void;
    trackRemoveFromCart: (cart: Schemas['Cart'], product: Schemas['Product'], quantity?: number) => void;
    trackViewCart: (cart: Schemas['Cart'], products: Schemas['Product'][]) => void;
}

export type PondAnalyticsType = 'gtm' | 'gtag';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer?: any[]
    }
}
