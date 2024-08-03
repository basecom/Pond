import { pascalCase } from 'scule';
import type { Schemas } from '@shopware/api-client/api-types';

export function useCmsUtils() {
    const getCmsSectionComponentName = (title: string) => (title ? 'CmsSection' + pascalCase(title) : '');

    const getCmsBlockComponentName = (title: string) => (title ? 'CmsBlock' + pascalCase(title) : '');

    const getCmsElementComponentName = (title: string) => (title ? 'CmsElement' + pascalCase(title) : '');

    const componentExists = (componentName: string) => resolveComponent(componentName) !== componentName;


    const getSectionClasses = (section: Schemas['CmsSection']) => {
        console.log(section);
        let classes = '';
        if (section.cssClass) {
            classes += section.cssClass;
        }
        if (section.sizingMode === "boxed") {
            classes += " container mx-auto";
        }
        return classes;
    }

    const getBlockClasses = (block: Schemas['CmsBlock']) => {
        let classes = '';
        if (block.cssClass) {
            classes += block.cssClass;
        }
        return classes;
    }

    return {
        getCmsSectionComponentName,
        getCmsBlockComponentName,
        getCmsElementComponentName,
        componentExists,
        getSectionClasses,
        getBlockClasses,
    };
}