import type { PondAnalyticsType } from '../analytics/analytics';

export interface PondHooks {
    'pond:determine-access-token': (accessKey: AccessToken) => HookResult;
}

declare module '#app' {
    interface RuntimeNuxtHooks extends PondHooks {}
}

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        pond: {
            accessToken: string;
            shopwareEndpoint: string;
            analytics: {
                enabled: boolean;
                type: PondAnalyticsType;
                trackingUrl?: string;
                id?: string;
            };
        };
    }
}
