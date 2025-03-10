import { pascalCase } from 'scule';
import type { Schemas } from '@shopware/api-client/api-types';

export const useCmsUtils = () => {
    const runtimeConfig = useRuntimeConfig();
    const getCmsSectionComponentName = (title: string) => (title ? `CmsSection${ pascalCase(title) }` : '');

    const getCmsBlockComponentName = (title: string) => (title ? `CmsBlock${ pascalCase(title) }` : '');

    const getCmsElementComponentName = (title: string) => (title ? `CmsElement${ pascalCase(title) }` : '');

    const componentExists = (componentName: string) => resolveComponent(componentName) !== componentName;

    const getSectionClasses = (section: Schemas['CmsSection']) => {
        let classes = '';
        if (section.cssClass) {
            classes += section.cssClass;
        }
        if (section.sizingMode === 'boxed') {
            classes += ' container mx-auto';
        }
        return classes;
    };

    const getBlockClasses = (block: Schemas['CmsBlock']) => {
        let classes = '';
        if (block.cssClass) {
            classes += block.cssClass;
        }
        return classes;
    };

    const getCmsElementData = (element: Schemas['CmsSlot'], key?: string) =>
        // data can contain multiple types. as long a showpare doesnt support it in there default type, we ignore it
        // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
        // @ts-ignore
        key ? element.data[key] : element.data
    ;

    const shouldPreloadElement = (element: Schemas['CmsSlot']): boolean => {
        const cmsPage = inject<Schemas['CmsPage']>('cmsPage');
        const isPreloadingEnabled = runtimeConfig.public.pond.preloading.enabled;
        const preloadingClass = runtimeConfig.public.pond.preloading.imagePreloadingClass;

        if (!cmsPage || !isPreloadingEnabled) {
            return false;
        }

        let cmsSectionIndex: number = -1;
        let cmsBlockIndex: number = -1;
        let cmsElementIndex: number = -1;

        cmsPage.sections.forEach((section, sectionIndex) => {
            section.blocks.forEach((block, blockIndex) => {
                block.slots.forEach((slot, slotIndex) => {
                    if (slot.id === element.id) {
                        cmsSectionIndex = sectionIndex;
                        cmsBlockIndex = blockIndex;
                        cmsElementIndex = slotIndex;
                    }
                });
            });
        });

        if (cmsSectionIndex === -1 || cmsBlockIndex === -1 || cmsElementIndex === -1) {
            return false;
        }

        const cmsBlock = cmsPage.sections[cmsSectionIndex]?.blocks[cmsBlockIndex] as Schemas['CmsBlock'];
        const blockClasses = getBlockClasses(cmsBlock);
        const hasPreloadingClass = blockClasses.includes(preloadingClass);
        const isFirstElement = cmsElementIndex === 0;
        const isFirstBlock = cmsBlockIndex === 0;
        const isFirstSection = cmsSectionIndex === 0;

        if (hasPreloadingClass && isFirstElement) {
            return true;
        }

        return isFirstSection && isFirstBlock && isFirstElement;
    };

    return {
        getCmsSectionComponentName,
        getCmsElementData,
        getCmsBlockComponentName,
        getCmsElementComponentName,
        componentExists,
        getSectionClasses,
        getBlockClasses,
        shouldPreloadElement,
    };
};
