export const usePondGetEntities = () => {
    const { search: searchCategory } = useCategorySearch();
    const { search: searchLandingPage } = useLandingSearch();
    const { handleError } = usePondHandleError();

    const getCategory = async (navigationId: string|null) => {
        if (!navigationId) {
            return null;
        }

        try {
            return (await usePondCacheAsyncData(
                `category-${navigationId}`,
                async () =>
                    await searchCategory(navigationId, {
                        withCmsAssociations: true,
                    }),
            )).data;
        } catch (error) {
            handleError(error);
            return null;
        }
    };

    const getLandingPage = async (navigationId: string|null) => {
        if (!navigationId) {
            return null;
        }

        try {
            return (await usePondCacheAsyncData(
                `landing-page-${navigationId}`,
                async () =>
                    await searchLandingPage(navigationId, {
                        withCmsAssociations: true,
                    }),
            )).data;
        } catch (error) {
            handleError(error);
            return null;
        }
    };

    return {
        getCategory,
        getLandingPage,
    };
};
