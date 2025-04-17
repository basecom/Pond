import type { Schemas } from '@shopware/api-client/api-types';
import { getCategoryUrl, getTranslatedProperty, getProductUrl } from '@shopware/helpers';

export const usePondNavigationUtils = (navigationElement: Schemas['Category']) => {
    const { search: searchCategory } = useCategorySearch();
    const { search: searchProduct } = useProductSearch();
    const { search: searchLanding } = useLandingSearch();

    const isExternalLink = getTranslatedProperty(navigationElement, 'linkType') === 'external' || navigationElement.linkType === 'external';

    const isCategoryLink = getTranslatedProperty(navigationElement, 'linkType') === 'category' || navigationElement.linkType === 'category';

    const isProductLink = getTranslatedProperty(navigationElement, 'linkType') === 'product' || navigationElement.linkType === 'product';

    const isLandingPageLink = getTranslatedProperty(navigationElement, 'linkType') === 'landing_page' || navigationElement.linkType === 'landing_page';

    const isInternalLink = isProductLink || isCategoryLink || isLandingPageLink;

    const linkNewTab = getTranslatedProperty(navigationElement, 'linkNewTab') || navigationElement.linkNewTab;

    const externalLink = getTranslatedProperty(navigationElement, 'externalLink') || navigationElement.externalLink;

    const internalLink = getTranslatedProperty(navigationElement, 'internalLink') || navigationElement.internalLink;

    const path = ref('');

    const loadInternalLink = async () => {
        if (!internalLink) {
            return;
        }

        if (isCategoryLink) {
            const { data: categoryResponse } = await usePondCacheAsyncData(
                `category-${internalLink}`,
                async () => await searchCategory(internalLink),
            );

            if (!categoryResponse || !categoryResponse.value) {
                return;
            }

            path.value = getCategoryUrl(categoryResponse.value);
            return;
        }

        if (isProductLink) {
            const { data: productResponse } = await usePondCacheAsyncData(
                `product-${internalLink}`,
                async () => await searchProduct(internalLink),
            );

            if (!productResponse || !productResponse.value?.product) {
                return;
            }

            path.value = getProductUrl(productResponse.value.product);
            return;
        }

        if (isLandingPageLink) {
            const { data: landingPageResponse } = await usePondCacheAsyncData(
                `landingPage-${internalLink}`,
                async () => searchLanding(internalLink),
            );

            if (!landingPageResponse || !landingPageResponse.value) {
                return;
            }

            path.value = getTranslatedProperty(landingPageResponse.value, 'url');
            return;
        }
    };

    return {
        isExternalLink,
        isInternalLink,
        linkNewTab,
        externalLink,
        internalLink,
        path,
        loadInternalLink,
    };
};
