export function useAnalyticsConfig() {
    const runtimeConfig = useRuntimeConfig();
    const isEnabled = computed(() => runtimeConfig.public.pond.analytics.enabled);
    const type = computed(() => runtimeConfig.public.pond.analytics.type);
    const id = computed(() => runtimeConfig.public.pond.analytics.id);
    const trackingUrl = computed(() => runtimeConfig.public.pond.analytics.trackingUrl);

    return {
        isEnabled,
        type,
        id,
        trackingUrl,
    };
}
