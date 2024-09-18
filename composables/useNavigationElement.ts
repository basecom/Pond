import { getTranslatedProperty, getCategoryUrl } from '@shopware-pwa/helpers-next';
import { useCategorySearch } from '#imports';

export function useNavigationElement(navigationElement) {
    const { search } = useCategorySearch();
    const isExternalLink =
        getTranslatedProperty(navigationElement, 'linkType') === 'external' ||
        navigationElement.linkType === 'external';

    const isInternalLink =
        getTranslatedProperty(navigationElement, 'linkType') === 'category' ||
        navigationElement.linkType === 'category';

    const linkNewTab = getTranslatedProperty(navigationElement, 'linkNewTab') || navigationElement.linkNewTab;

    const externalLink = getTranslatedProperty(navigationElement, 'externalLink') || navigationElement.externalLink;

    const internalLink = getTranslatedProperty(navigationElement, 'internalLink') || navigationElement.internalLink;

    const path = ref('');

    const getInternalRoute = async () => {
        if (!internalLink) {
            return;
        }
        const { data: categoryResponse } = await useAsyncData('navigation' + internalLink, async () => {
            return await search(internalLink);
        });
        if (!categoryResponse && !categoryResponse.value) {
            return;
        }

        path.value = getCategoryUrl(categoryResponse.value);

        return getCategoryUrl(categoryResponse);
    };

    return {
        isExternalLink,
        isInternalLink,
        linkNewTab,
        externalLink,
        internalLink,
        getInternalRoute,
        path,
    };
}
