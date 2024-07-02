import { createShopwareContext } from "#imports";
import { createAPIClient } from "@shopware/api-client";

export class AccessToken {
    public token?: string;

    constructor(token?: string) {
        this.token = token;
    }
}

export default defineNuxtPlugin(async nuxtApp => {
    const runtimeConfig = useRuntimeConfig();
    const contextToken = useCookie('contextToken');

    const accessToken = new AccessToken(runtimeConfig.public.pond.accessToken);
    await nuxtApp.callHook('pond:determine-access-token', accessToken);

    if (!accessToken.token) {
        throw new Error('No shopware access token provided');
    }

    const apiClient = createAPIClient({
        baseURL: `${runtimeConfig.public.pond.shopwareEndpoint}/store-api`,
        accessToken: accessToken.token,
        contextToken: contextToken.value ?? undefined,
    });

    apiClient.hook('onContextChanged', (newContextToken) => {
        contextToken.value = newContextToken;
    });

    // TODO: Maintenance mode

    nuxtApp.vueApp.provide('apiClient', apiClient);

    const shopwareContext = createShopwareContext(nuxtApp.vueApp, {
        enableDevtools: true,
        devStorefrontUrl: runtimeConfig.public.pond.shopwareEndpoint,
    });
    nuxtApp.vueApp.provide('shopware', shopwareContext);

    const sessionContextData = ref();
    nuxtApp.vueApp.provide('swSessionContext', sessionContextData);
    useState('swSessionContext', () => sessionContextData);
});

