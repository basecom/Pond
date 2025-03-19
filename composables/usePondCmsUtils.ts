import { pascalCase } from 'scule';
import type { Schemas } from '@shopware/api-client/api-types';

export const usePondCmsUtils = () => {
    const config = useRuntimeConfig();

    const getCmsSectionComponentName = (title: string) => (title ? `CmsSection${pascalCase(title)}` : '');

    const getCmsBlockComponentName = (title: string) => (title ? `CmsBlock${pascalCase(title)}` : '');

    const getCmsElementComponentName = (title: string) => (title ? `CmsElement${pascalCase(title)}` : '');

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

    const getBlockClasses = (block: Schemas['CmsBlock']) => block.cssClass ? block.cssClass  : '';

    const getCmsElementData = (element: Schemas['CmsSlot'], key?: string) =>
        // data can contain multiple types. as long a shopware doesn't support it in their default type, we ignore it
        // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
        // @ts-ignore
        key ? element.data[key] : element.data
    ;

    const isDevelopment = () => config.public.pond.isInDebugMode;

    return {
        getCmsSectionComponentName,
        getCmsElementData,
        getCmsBlockComponentName,
        getCmsElementComponentName,
        componentExists,
        getSectionClasses,
        getBlockClasses,
        isDevelopment,
    };
};
