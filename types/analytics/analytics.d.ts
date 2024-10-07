import type { Schemas } from '@shopware/api-client/api-types';

export type UseAnalyticsReturn = {
    updateConsent: (activeCookies: string[]) => void;
    trackAddToCart: (product: Schemas['Product'], quantity?: number) => void;
    trackRemoveFromCart: (product: Schemas['Product'], quantity?: number) => void;
    trackViewCart: () => void;
}

export type PondAnalyticsType = 'gtm' | 'gtag';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer?: any[]
    }
}
