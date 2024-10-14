export function usePluginConfig() {
    const { apiClient } = useShopwareContext();
    const configValues = useState('pluginConfig', () => {});

    const loadConfig = async () => {
        return useAsyncData('pluginConfiguration', async () => {
            try {
                const data = (await apiClient.invoke('loadConfig get /pond/config')).data;
                configValues.value = data;
                return data;
            } catch (error) {
                return [];
            }
        });
    };

    return {
        loadConfig,
        configValues,
    };
}
