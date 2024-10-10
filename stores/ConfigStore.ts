export const useConfigStore = defineStore('config', () => {
    const { loadConfig, configValues } = usePluginConfig();

    const get = (key: string) => {
        if (!configValues.value) {
            if (import.meta.dev) {
                console.warn('[Pond]: config values not loaded');
            }
            return undefined;
        }

        if (!(key in configValues.value)) {
            if (import.meta.dev) {
                console.warn(`[Pond]: The configuration for '${key}' was not found`);
            }
            return undefined;
        }

        return configValues.value[key];
    };

    return {
        loadConfig,
        get,
    };
});
