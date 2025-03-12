import { createShopwareContext } from '#imports';
import { createAPIClient } from '@shopware/api-client';
import { isMaintenanceMode } from '@shopware-pwa/helpers-next';
import type { ShopwareResponse } from '~/types/ShopwareResponse';

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

    apiClient.hook('onContextChanged', newContextToken => {
        contextToken.value = newContextToken;
    });

    apiClient.hook('onResponseError', (response: Response) => {
        const shopwareResponse = response as ShopwareResponse;
        const maintenance = isMaintenanceMode([{ code: shopwareResponse._data?.errors.code ?? undefined }]);

        if (maintenance) {
            showError({
                statusCode: 503,
                statusMessage: 'MAINTENANCE_MODE',
            });
        }
    });

    nuxtApp.vueApp.provide('apiClient', apiClient);

    const shopwareContext = createShopwareContext(nuxtApp.vueApp, {
        enableDevtools: true,
        devStorefrontUrl: runtimeConfig.public.pond.devStorefrontUrl !== '' ? runtimeConfig.public.pond.devStorefrontUrl : null,
    });
    nuxtApp.vueApp.provide('shopware', shopwareContext);

    const sessionContextData = ref();
    nuxtApp.vueApp.provide('swSessionContext', sessionContextData);
    useState('swSessionContext', () => sessionContextData);
});
