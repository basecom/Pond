import { getCategoryBreadcrumbs } from '@shopware-pwa/helpers-next';

export function useCategoryBreadcrumbs() {
    const { apiClient } = useShopwareContext();

    const _loadCategoryBreadcrumbsFromApi = async (categoryId: string): Promise<Breadcrumb[]> => {
        const response = await apiClient.invoke('readBreadcrumb get /breadcrumb/{id}', {
            pathParams: {
                id: categoryId
            },
            query: {
                type: 'category'
            }
        });

        return response.data.breadcrumbs;
    };

    const _mapBreadcrumbsFromApi = (breadcrumbs: Breadcrumb[]): Breadcrumb[] => {
        return breadcrumbs.map((breadcrumb) => {
            return {
                ...breadcrumb,
                path: `/${ breadcrumb.path }`
            };
        });
    };

    const getBreadcrumbs = async (category: Schemas['Category']): Promise<Breadcrumb[]> => {
        try {
            const breadcrumbs = await _loadCategoryBreadcrumbsFromApi(category.id);

            return _mapBreadcrumbsFromApi(breadcrumbs);
        } catch ( e ) {
            return getCategoryBreadcrumbs(category, {
                startIndex: 1
            });
        }
    };

    return {
        getBreadcrumbs,
    };
}