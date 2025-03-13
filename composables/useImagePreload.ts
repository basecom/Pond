import type { PreloadImageConfig } from '../types/PreloadImageConfig';

export function useImagePreload(config: PreloadImageConfig) {
    const runtimeConfig = useRuntimeConfig();
    const enableImagePreloading = runtimeConfig.public.pond.preloading.enabled;

    if (import.meta.client || !enableImagePreloading) {
        return;
    }

    useHead({
        link: [
            {
                rel: 'preload',
                as: 'image',
                href: config.src,
                tagPriority: 'critical',
                ...(config.srcset ? { srcset: config.srcset } : {}),
                ...(config.size ? { sizes: config.size } : {}),
                ...(config.alt ? { alt: config.alt } : {}),
            },
        ],
    });
}
