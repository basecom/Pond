import { pascalCase } from 'scule';
import type { Schemas } from '@shopware/api-client/api-types';

export const useCmsUtils = () => {
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

    return {
        getCmsSectionComponentName,
        getCmsElementData,
        getCmsBlockComponentName,
        getCmsElementComponentName,
        componentExists,
        getSectionClasses,
        getBlockClasses,
    };
};
