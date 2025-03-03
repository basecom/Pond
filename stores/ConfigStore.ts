import type { PluginConfiguration } from '~/types/PluginConfiguration';

export const useConfigStore = defineStore('config', () => {
    const { fetchConfig } = usePluginConfig();
    const { handleError } = useHandleError();
    const _configValues: Ref<PluginConfiguration | null> = ref(null);
    const loading = ref(false);

    const loadConfig = async () => {
        loading.value = true;
        const { data } = await fetchConfig();
        _configValues.value = data.value as PluginConfiguration | null;
        loading.value = false;
    };

    const configValues = computed(() => _configValues.value);

    const get = (key: string) => {
        if (!_configValues.value) {
            handleError('[Pond]: config values not loaded', false);
            return undefined;
        }

        if (!(key in _configValues.value)) {
            handleError(`[Pond]: The configuration for '${key}' was not found`, false);
            return undefined;
        }

        return _configValues.value[key];
    };

    return {
        loadConfig,
        configValues,
        get,
    };
});
