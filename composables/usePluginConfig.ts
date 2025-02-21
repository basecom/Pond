import type { PluginConfiguration } from '~/types/PluginConfiguration';

export function usePluginConfig() {
    const { apiClient } = useShopwareContext();

    const fetchConfig = async () =>
        useAsyncData('pluginConfiguration', async () => {
            try {
                return (await apiClient.invoke('loadConfig get /pond/config')).data as PluginConfiguration;
            } catch (error) {
                return null;
            }
        });

    return {
        fetchConfig,
    };
}
