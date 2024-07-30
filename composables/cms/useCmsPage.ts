import type { Schemas } from '@shopware/api-client/api-types';
import { pascalCase } from 'scule';

export function useCmsPage(cmsPage: Schemas['CmsPage']) {
    const cmsSections = computed<Schemas['CmsSection'][]>(() => (cmsPage.sections as Schemas['CmsSection'][]) || []);

    const getCssClasses = (section: Schemas['CmsSection']) => {
        let classes = '';
        if (section.cssClass) {
            classes += section.cssClass;
        }
        if (section.sizingMode === "boxed") {
            classes += " container mx-auto";
        }
        return classes;
    }

    const render = () => {
        const componentsMap = cmsSections.value.map((section) => {
            return {
                name: `CmsSection${pascalCase(section.type)}`,
                component: resolveComponent(`CmsSection${pascalCase(section.type)}`),
                section: section,
            };
        });
        return componentsMap.map((componentObject) => {
            if (typeof componentObject.component === "string") {
                return h("div", {}, `component ${componentObject.component} not found` );
            } else {
                return h(componentObject.component, {
                    content: componentObject.section,
                    class: getCssClasses(componentObject.section),
                    style: {
                        backgroundColor: componentObject.section.backgroundColor,
                        backgroundImage: componentObject.section.backgroundMedia?.url ? `url(${componentObject.section.backgroundMedia?.url})` : '',
                    },
                });
            }
        });
    };

    return {
        render
    };
}