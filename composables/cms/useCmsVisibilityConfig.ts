import type { Schemas } from '@shopware/api-client/api-types';
import type {
    CmsElementConfig,
    CmsElementLazyLoadConfig,
    CmsPageConfig,
} from '../../types/cms/cmsVisibility';

export function useCmsVisibilityConfig(pageConfig: Ref<CmsPageConfig | null>) {
    const visibleElements: ComputedRef<string[]> = computed(() => pageConfig.value?.elements
        .filter((element) => element.visible)
        .map((element) => element.id) ?? []);

    const setCmsPage = (cmsPage: Schemas['CmsPage']) => {
        pageConfig.value = {
            id: cmsPage.id,
            elements: [],
        };
    };

    const setCmsElement = (cmsElement: Schemas['CmsSlot']) => {
        if (!pageConfig.value) {
            return;
        }

        const firstLazyLoadResource = pageConfig.value.elements.findIndex((element: CmsElementConfig) => !!element.lazyLoad.length);

        pageConfig.value = {
            ...pageConfig.value,
            elements: [
                ...pageConfig.value.elements,
                {
                    id: cmsElement.id!,
                    visible: firstLazyLoadResource === -1,
                    loaded: false,
                    lazyLoad: [],
                },
            ],
        };
    };

    const setCmsElementLazyLoad = (cmsElementId: string, lazyLoadConfig: CmsElementLazyLoadConfig) => {
        if (!pageConfig.value) {
            return;
        }

        const elementIndex = pageConfig.value.elements.findIndex((element) => element.id === cmsElementId);

        if (elementIndex === -1) {
            return;
        }

        const element = pageConfig.value.elements[elementIndex] as CmsElementConfig;
        const elementsBefore = pageConfig.value.elements.slice(0, elementIndex);
        const elementsAfter = pageConfig.value.elements.slice(elementIndex + 1).map((element: CmsElementConfig): CmsElementConfig => ({ ...element, visible: false }));
        const newElements = [
            ...elementsBefore,
            {
                ...element,
                lazyLoad: [
                    ...element.lazyLoad,
                    lazyLoadConfig,
                ],
            },
            ...elementsAfter,
        ];

        pageConfig.value = {
            ...pageConfig.value,
            elements: newElements,
        };
    };

    const getCmsElementById = (id: string): CmsElementConfig | undefined => pageConfig.value?.elements.find((element: CmsElementConfig) => element.id === id);
    const getLazyLoadConfigById = (cmsElementId: string, lazyLoadId: string): CmsElementLazyLoadConfig | undefined =>
        pageConfig.value
            ?.elements
            .find((element: CmsElementConfig) => element.id === cmsElementId)
            ?.lazyLoad
            .find((lazyLoad: CmsElementLazyLoadConfig) => lazyLoad.id === lazyLoadId);

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
