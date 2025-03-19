import type { PluginConfiguration } from '~/types/PluginConfiguration';

export const useConfigStore = defineStore('config', () => {
    const { apiClient } = useShopwareContext();
    const { handleError } = usePondHandleError();
    const configValues: Ref<PluginConfiguration | null> = ref(null);
    const loading = ref(false);

    const fetchConfig = async () =>
        usePondCacheAsyncData('pluginConfiguration', async () => {
            try {
                return (await apiClient.invoke('loadConfig get /pond/config')).data as PluginConfiguration;
            } catch (error) {
                handleError(error);
                return null;
            }
        });

    const loadConfig = async () => {
        loading.value = true;
        const { data } = await fetchConfig();
        configValues.value = data.value as PluginConfiguration | null;
        loading.value = false;
    };

    const get = (key: string) => {
        if (!configValues.value) {
            handleError('[Pond][ConfigStore]: config values not loaded', false);
            return undefined;
        }

        if (!(key in configValues.value)) {
            handleError(`[Pond][ConfigStore]: The configuration for '${key}' was not found`, false);
            return undefined;
        }

        return configValues.value[key];
    };

    return {
        loadConfig,
        get,
    };
});
