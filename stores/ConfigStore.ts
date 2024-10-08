export const useConfigStore = defineStore('config', () => {
    const { loadConfig, fetchConfig, configValues } = usePluginConfig();

    return {
        loadConfig,
        fetchConfig,
        configValues,
    }
})