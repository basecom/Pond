import type { Schemas } from '@shopware/api-client/api-types';

export function useCmsElementPreload(cmsPage?: Schemas['CmsPage']) {
    const { getBlockClasses } = useCmsUtils();
    const runtimeConfig = useRuntimeConfig();

    const getPreloadElementId = (cmsPage: Schemas['CmsPage']): string | undefined => {
        const isPreloadingEnabled = runtimeConfig.public.pond.preloading.enabled;
        const preloadingClass = runtimeConfig.public.pond.preloading.imagePreloadingClass;

        if (!cmsPage || !isPreloadingEnabled) {
            return;
        }

        let cmsElementToPreload: Schemas['CmsSlot'] | undefined;

        cmsPage.sections.forEach((section: Schemas['CmsSection']) => {
            section.blocks.forEach((block: Schemas['CmsBlock']) => {
                const blockClasses = getBlockClasses(block);
                const hasPreloadingClass = blockClasses.includes(preloadingClass);

                if (hasPreloadingClass && !cmsElementToPreload) {
                    cmsElementToPreload = block.slots[0];
                }
            });
        });

        if (cmsElementToPreload) {
            return cmsElementToPreload.id;
        }

        return cmsPage.sections[0]?.blocks[0]?.slots[0]?.id;
    };

    const _preloadedCmsElementId = useContext<string | undefined>('cmsPreloadElementId', {
        replace: cmsPage ? getPreloadElementId(cmsPage) : undefined,
    });

    const shouldPreloadElement = (cmsElement: Schemas['CmsSlot']): boolean => _preloadedCmsElementId.value === cmsElement.id;

    return {
        shouldPreloadElement,
    };
}
