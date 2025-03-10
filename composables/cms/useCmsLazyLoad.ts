import type { CmsElementLazyLoadConfig, CmsPageConfig, LazyLoadTypes } from '../../types/cms/cmsVisibility';

/**
 * On server:
 * It adds the lazy load to the element config.
 * It adds the data attributes that will be used on client to get the SSR html.
 *
 * On client:
 * It takes the HTML from the SSR, and it watches for the loading based on the defined data attributes and the existing mapping.
 * Once the configured lazy load composable is loaded it sets the lazy load configuration as loaded.
 *
 * @param pageConfig
 */
export function useCmsLazyLoad(pageConfig: Ref<CmsPageConfig | null>) {
    const runtimeConfig = useRuntimeConfig();
    const { getLazyLoadConfigById, setCmsElementLazyLoad } = useCmsVisibilityConfig(pageConfig);
    const ssrCmsElementId = ref<string | null>(null);
    const ssrLazyLoadId = ref<string | null>(null);
    const { getLazyLoadComposable } = useCmsLazyLoadMappings();
    const isProgressiveLoadingEnabled = runtimeConfig.public.pond.cms.enableProgressiveLoading;

    const getSsrPageAttributes =() => {
        if (!isProgressiveLoadingEnabled || import.meta.client || !ssrCmsElementId.value || !ssrLazyLoadId.value) {
            return;
        }

        const lazyLoad = getLazyLoadConfigById(ssrCmsElementId.value, ssrLazyLoadId.value);

        return {
            'data-cms-element-lazy-load': true,
            'data-cms-element-lazy-load-id': lazyLoad?.id,
            'data-cms-element-lazy-load-type': lazyLoad?.type,
        };
    };

    const setSsrLazyLoad = (cmsElementId: string, lazyLoadConfig: CmsElementLazyLoadConfig) => {
        if (!isProgressiveLoadingEnabled || import.meta.client) {
            return;
        }

        ssrLazyLoadId.value = lazyLoadConfig.id;
        ssrCmsElementId.value = cmsElementId;
        setCmsElementLazyLoad(cmsElementId, lazyLoadConfig);
    };

    const watchCsrElementsLoaded = (cmsElementId: string, lazyLoadId: string, callback: () => void) => {
        if (!isProgressiveLoadingEnabled || import.meta.server) {
            return;
        }

        const element = document.querySelector<HTMLElement>(`[data-cms-element-lazy-load-id="${ lazyLoadId }"]`);
        const config = getLazyLoadConfigById(cmsElementId, lazyLoadId);

        if (!element || !config) {
            return;
        }

        const lazyLoadType = element.getAttribute('data-cms-element-lazy-load-type') as LazyLoadTypes;
        const useLazyLoad = getLazyLoadComposable(lazyLoadType);
        const { watchElementLoaded } = useLazyLoad();

        watchElementLoaded(element, () => {
            config.loaded = true;

            callback();
        });
    };

    return {
        getSsrPageAttributes,
        setSsrLazyLoad,
        watchCsrElementsLoaded,
    };
}
