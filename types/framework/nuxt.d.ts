export interface PondHooks {
    'pond:determine-access-token': (accessKey: AccessToken) => HookResult
}

declare module '#app' {
    interface RuntimeNuxtHooks extends PondHooks { }
}

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        pond: {
            accessToken: string;
            shopwareEndpoint: string;
        }
    }
}