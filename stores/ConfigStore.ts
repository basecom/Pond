export const useConfigStore = defineStore('config', () => {
    const { fetchConfig } = usePluginConfig();
    const _configValues = ref([]);
    const loading = ref(false);

    const loadConfig = async () => {
        loading.value = true;
        const { data } = await fetchConfig();
        _configValues.value = data.value;
        loading.value = false;
    };

    const configValues = computed(() => _configValues.value);

    const get = (key: string) => {
        if (!_configValues.value) {
            if (import.meta.dev) {
                console.warn('[Pond]: config values not loaded');
            }
            return undefined;
        }

        if (!(key in _configValues.value)) {
            if (import.meta.dev) {
                console.warn(`[Pond]: The configuration for '${key}' was not found`);
            }
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
