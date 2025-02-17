import type { Schemas } from '@shopware/api-client/api-types';
import type {
    CmsElementConfig,
    CmsElementLazyLoadConfig,
    CmsPageConfig,
} from '../../types/cms/cmsVisibility';

export function useCmsVisibilityConfig(pageConfig: Ref<CmsPageConfig | null>) {
    const visibleElements: ComputedRef<string[]> = computed(() => {
        return pageConfig.value?.elements
            .filter((element) => element.visible)
            .map((element) => element.id) ?? [];
    });

    const setCmsPage = (cmsPage: Schemas['CmsPage']) => {
        pageConfig.value = {
            id: cmsPage.id,
            elements: []
        };
    };

    const setCmsElement = (cmsElement: Schemas['CmsSlot']) => {
        const cmsPage = pageConfig.value;

        if (!cmsPage) {
            return;
        }

        const firstLazyLoadResource = cmsPage.elements.findIndex((element) => !!element.lazyLoad.length);

        pageConfig.value = {
            ...cmsPage,
            elements: [
                ...cmsPage.elements,
                {
                    id: cmsElement.id,
                    visible: firstLazyLoadResource === -1,
                    loaded: false,
                    lazyLoad: [],
                }
            ]
        };
    };

    const setCmsElementLazyLoad = (cmsElementId: string, lazyLoadConfig: CmsElementLazyLoadConfig) => {
        const cmsPage = pageConfig.value;

        if (!cmsPage) {
            return;
        }

        const elementIndex = cmsPage.elements.findIndex((element) => element.id === cmsElementId);

        if (elementIndex === -1) {
            return;
        }

        const element = cmsPage.elements[elementIndex] as CmsElementConfig;
        const elementsBefore = cmsPage.elements.slice(0, elementIndex);
        const elementsAfter = cmsPage.elements.slice(elementIndex + 1).map((element): CmsElementConfig => ({...element, visible: false }));
        const newElements = [
            ...elementsBefore,
            {
                ...element,
                lazyLoad: [
                    ...element.lazyLoad,
                    lazyLoadConfig
                ]
            },
            ...elementsAfter
        ];

        pageConfig.value = {
            ...cmsPage,
            elements: newElements,
        };
    };

    const getCmsElementById = (id: string): CmsElementConfig | undefined => pageConfig.value?.elements.find((element) => element.id === id);
    const getLazyLoadConfigById = (cmsElementId: string, lazyLoadId: string): CmsElementLazyLoadConfig | undefined =>
        pageConfig.value
            ?.elements
            .find((element) => element.id === cmsElementId)
            ?.lazyLoad
            .find((lazyLoad) => lazyLoad.id === lazyLoadId);

    return {
        pageConfig,
        visibleElements,
        setCmsPage,
        setCmsElement,
        setCmsElementLazyLoad,
        getCmsElementById,
        getLazyLoadConfigById,
    };
}