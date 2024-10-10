export function usePluginConfig() {
    const { apiClient } = useShopwareContext();
    const configValues = ref({});

    const loadConfig = async () => {
        return useAsyncData('pluginConfiguration', async () => {
            try {
                const data = (await apiClient.invoke('loadConfig get /pond/config')).data;
                configValues.value = data;
                return data;
            } catch (e) {
                return [];
            }
        });
    };

    return {
        loadConfig,
        configValues,
    };
}
