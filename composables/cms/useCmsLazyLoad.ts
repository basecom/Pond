import type { CmsElementLazyLoadConfig, CmsPageConfig, LazyLoadTypes } from '../../types/cms/cmsVisibility';

export function useCmsLazyLoad(pageConfig: Ref<CmsPageConfig | null>) {
    const runtimeConfig = useRuntimeConfig();
    const { getLazyLoadConfigById, setCmsElementLazyLoad } = useCmsVisibilityConfig(pageConfig);
    const ssrCmsElementId = ref<string>('');
    const ssrLazyLoadId = ref<string>('');
    const { getLazyLoadComposable } = useCmsLazyLoadTypes();
    const isProgressiveLoadingEnabled = runtimeConfig.public.pond.cms.enableProgressiveLoading;

    const getSsrPageAttributes =() => {
        if (!isProgressiveLoadingEnabled || import.meta.client) {
            return;
        }

        const lazyLoad = getLazyLoadConfigById(ssrCmsElementId.value, ssrLazyLoadId.value);

        return {
            'data-cms-element-lazy-load': true,
            'data-cms-element-lazy-load-id': lazyLoad?.id,
            'data-cms-element-lazy-load-type': lazyLoad?.type
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

    const watchCsrElementsLoaded = (cmsElementId: string, lazyLoadId: string, cb: () => void) => {
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

            cb();
        });
    };

    return {
        getSsrPageAttributes,
        setSsrLazyLoad,
        watchCsrElementsLoaded
    };
}