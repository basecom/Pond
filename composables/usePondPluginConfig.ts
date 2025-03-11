import type { PluginConfiguration } from '~/types/PluginConfiguration';
import {usePondCacheAsyncData} from '~/composables/usePondCacheAsyncData';

export function usePondPluginConfig() {
    const { apiClient } = useShopwareContext();
    const { handleError } = usePondHandleError();

    const fetchConfig = async () =>
        usePondCacheAsyncData('pluginConfiguration', async () => {
            try {
                return (await apiClient.invoke('loadConfig get /pond/config')).data as PluginConfiguration;
            } catch (error) {
                handleError(error);
                return null;
            }
        });

    return {
        fetchConfig,
    };
}
