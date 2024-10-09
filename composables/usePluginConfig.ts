export function usePluginConfig() {
    const { apiClient } = useShopwareContext();
    const configValues = ref({});

    const loadConfig = async () => {
        return useAsyncData('pluginConfiguration', async () => {
            const data = (await apiClient.invoke('loadConfig get /pond/config')).data;
            configValues.value = data;
            return data;
        });
    };

    return {
        loadConfig,
        // configValues: computed(() => _configValues.value),
        configValues,
    };
}
