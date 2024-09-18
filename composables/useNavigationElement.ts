import { getTranslatedProperty, getCategoryUrl, getProductUrl } from '@shopware-pwa/helpers-next';
import { useCategorySearch, useProductSearch, useLandingSearch } from '#imports';

export function useNavigationElement(navigationElement) {
    const { search: searchCategory } = useCategorySearch();
    const { search: searchProduct } = useProductSearch();
    const { search: searchLanding } = useLandingSearch();
    const isExternalLink =
        getTranslatedProperty(navigationElement, 'linkType') === 'external' ||
        navigationElement.linkType === 'external';

    const isCategoryLink =
        getTranslatedProperty(navigationElement, 'linkType') === 'category' ||
        navigationElement.linkType === 'category';

    const isProductLink =
        getTranslatedProperty(navigationElement, 'linkType') === 'product' || navigationElement.linkType === 'product';

    const isLandingPageLink =
        getTranslatedProperty(navigationElement, 'linkType') === 'landing_page' ||
        navigationElement.linkType === 'landing_page';

    const isInternalLink = isProductLink || isCategoryLink || isLandingPageLink;

    const linkNewTab = getTranslatedProperty(navigationElement, 'linkNewTab') || navigationElement.linkNewTab;

    const externalLink = getTranslatedProperty(navigationElement, 'externalLink') || navigationElement.externalLink;

    const internalLink = getTranslatedProperty(navigationElement, 'internalLink') || navigationElement.internalLink;

    const path = ref('');

    const getInternalRoute = async () => {
        if (!internalLink) {
            return;
        }
        if (isCategoryLink) {
            const { data: categoryResponse } = await useAsyncData(internalLink, async () => {
                return await searchCategory(internalLink);
            });

            if (!categoryResponse || !categoryResponse.value) {
                return;
            }

            path.value = getCategoryUrl(categoryResponse.value);
        } else if (isProductLink) {
            const { data: productResponse } = await useAsyncData(internalLink, async () => {
                return await searchProduct(internalLink);
            });

            if (!productResponse || !productResponse.value?.product) {
                return;
            }

            path.value = getProductUrl(productResponse.value.product);
        } else if (isLandingPageLink) {
            const { data: landingPageResponse } = await useAsyncData(internalLink, async () => {
                return searchLanding(internalLink);
            });

            if (!landingPageResponse || !landingPageResponse.value) {
                return;
            }

            path.value = getTranslatedProperty(landingPageResponse.value, 'url');
        }
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
