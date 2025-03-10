import type { Schemas } from '@shopware/api-client/api-types';
import type { CmsElementConfig, CmsPageConfig } from '../../types/cms/cmsVisibility';

/**
 * On server:
 * It adds the cms page to the page config.
 * It adds the data attributes that will be used on client to get the SSR html.
 *
 * On client:
 * It takes the SSR html and watches the elements to be loaded.
 * Once an element is loaded it will display the next loaded elements.
 *
 * @param pageConfig
 */
export function useCmsPageVisibility(pageConfig: Ref<CmsPageConfig | null>) {
    const runtimeConfig = useRuntimeConfig();
    const { setCmsPage } = useCmsVisibilityConfig(pageConfig);
    const { watchCsrElementVisibility, showCsrCmsElement } = useCmsElementVisibility(pageConfig);
    const isProgressiveLoadingEnabled = runtimeConfig.public.pond.cms.enableProgressiveLoading;

    const getSsrPageAttributes = () => {
        if (!isProgressiveLoadingEnabled || import.meta.client) {
            return;
        }

        return {
            'data-cms-page-id': pageConfig.value?.id,
        };
    };

    const setSsrCmsPage = (cmsPage: Schemas['CmsPage']) => {
        if (!isProgressiveLoadingEnabled || import.meta.client) {
            return;
        }

        setCmsPage(cmsPage);
    };

    const watchCsrPageVisibility = () => {
        if (!isProgressiveLoadingEnabled || import.meta.server) {
            return;
        }
        const config: CmsPageConfig | null = pageConfig.value;

        if (!config) {
            return;
        }

        const element = document.querySelector(`[data-cms-page-id="${config.id}"]`);

        if (!element) {
            return;
        }

        const updateElementsVisibility = () => {
            const firstNotLoaded = config.elements.findIndex((element: CmsElementConfig) => !element.loaded);

            config.elements.forEach((element: CmsElementConfig, index) => {
                if (element.visible) {
                    return;
                }

                const shouldBeVisible = firstNotLoaded === -1 ? true : index <= firstNotLoaded;

                if (shouldBeVisible) {
                    element.visible = true;
                    showCsrCmsElement(element.id);
                }
            });
        };

        config.elements.forEach((elementConfig: CmsElementConfig) => {
            watchCsrElementVisibility(elementConfig.id, () => {
                elementConfig.loaded = true;

                updateElementsVisibility();
            });
        });
    };

    return {
        getSsrPageAttributes,
        setSsrCmsPage,
        watchCsrPageVisibility,
    };
}
