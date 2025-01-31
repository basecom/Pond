import type {PluginConfiguration} from "~/types/pluginConfiguration";

export const useConfigStore = defineStore('config', () => {
    const { fetchConfig } = usePluginConfig();
    const _configValues: Ref<PluginConfiguration|null> = ref(null);
    const loading = ref(false);

    const loadConfig = async () => {
        loading.value = true;
        try {
            const { data } = await fetchConfig();
            _configValues.value = data.value;
        } catch (error: ) {

        }
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
