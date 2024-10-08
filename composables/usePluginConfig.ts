
export function usePluginConfig() {
    const { apiClient } = useShopwareContext();

    const loadConfig = async () => {
        await useAsyncData('pluginConfiguration', async () => {
            return await apiClient.invoke('loadConfig get /pond/config');
        });
    };

    return { loadConfig };
}
