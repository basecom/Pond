export const useConfigStore = defineStore('config', () => {
    const { loadConfig, configValues } = usePluginConfig();

    const get = (key: string) => {
        if (!configValues.value) {
            console.warn('[Pond]: config values not loaded');
            return undefined;
        }

        if (!configValues.value[key]) {
            console.warn(`[Pond]: The configuration for '${key}' was not found`);
            return undefined;
        }

        return configValues.value[key]
    }

    return {
        loadConfig,
        configValues,
        get
    }
})