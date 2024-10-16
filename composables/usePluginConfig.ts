export function usePluginConfig() {
    const { apiClient } = useShopwareContext();

    const fetchConfig = async () => {
        return useAsyncData('pluginConfiguration', async () => {
            try {
                return (await apiClient.invoke('loadConfig get /pond/config')).data;
            } catch (error) {
                return [];
            }
        });
    };

    return {
        fetchConfig,
    };
}
