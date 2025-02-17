import type { Schemas } from '@shopware/api-client/api-types';
import type { CmsPageConfig } from '../../types/cms/cmsVisibility';

export function useCmsElementVisibility(pageConfig: Ref<CmsPageConfig | null>) {
    const runtimeConfig = useRuntimeConfig();
    const { visibleElements, setCmsElement, getCmsElementById } = useCmsVisibilityConfig(pageConfig);
    const ssrCmsElementId = ref<string>('');
    const { watchCsrElementsLoaded } = useCmsLazyLoad(pageConfig);

    const isProgressiveLoadingEnabled = runtimeConfig.public.pond.cms.enableProgressiveLoading;

    const getSsrElementAttributes = () => {
        if (!isProgressiveLoadingEnabled || import.meta.client) {
            return;
        }

        const style = visibleElements.value.includes(ssrCmsElementId.value) ? '' : 'visibility: hidden;';

        return {
            'data-cms-element-id': ssrCmsElementId.value,
            style,
        };
    };

    const setSsrCmsElement = (cmsElement: Schemas['CmsSlot']) => {
        if (!isProgressiveLoadingEnabled || import.meta.client) {
            return;
        }

        ssrCmsElementId.value = cmsElement.id;
        setCmsElement(cmsElement);
    };

    const showCsrCmsElement = (cmsElementId: string) => {
        if (import.meta.server) {
            return;
        }

        const element = document.querySelector<HTMLElement>(`[data-cms-element-id="${cmsElementId}"]`);

        if (!element) {
            return;
        }

        element.style.visibility = 'visible';
    };

    const watchCsrElementVisibility = (cmsElementId: string, cb: () => void) => {
        if (!isProgressiveLoadingEnabled || import.meta.server) {
            return;
        }

        const element = document.querySelector<HTMLElement>(`[data-cms-element-id="${cmsElementId}"]`);
        const elementConfig = getCmsElementById(cmsElementId);

        if (!element || !elementConfig) {
            return;
        }

        if (!elementConfig.lazyLoad.length) {
            cb();
        }

        const loadedElements = [];

        elementConfig.lazyLoad.forEach(item => {
            watchCsrElementsLoaded(cmsElementId, item.id, () => {
                loadedElements.push(item.id);

                if (loadedElements.length === elementConfig.lazyLoad.length) {
                    elementConfig.loaded = true;
                    cb();
                }
            });
        });
    };

    return {
        setSsrCmsElement,
        getSsrElementAttributes,
        watchCsrElementVisibility,
        showCsrCmsElement,
    };
}
