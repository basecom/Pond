import { pascalCase } from 'scule';
import type { Schemas } from '@shopware/api-client/api-types';

export function useCmsUtils() {
    // const marginPositions = [
    //     { key: 'marginTop', short: 't' },
    //     { key: 'marginLeft', short: 'l' },
    //     { key: 'marginBottom', short: 'b' },
    //     { key: 'marginRight', short: 'r' }
    // ]
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

        // marginPositions.forEach(position => {
        //     const margin = block[position.key];
        //     if (margin) {
        //         if (margin.includes('px')) {
        //             const marginNumber = parseFloat(margin);
        //             const marginClass = marginNumber % 4 === 0
        //                 ? ` m${position.short}-${marginNumber / 4}`
        //                 : ` m${position.short}-[${margin}]`;
        //             classes += marginClass;
        //         } else {
        //             classes += ` m${position.short}-[${margin}]`;
        //         }
        //     }
        // })
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