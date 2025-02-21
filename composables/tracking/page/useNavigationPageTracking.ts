import type { UseAnalyticsReturn } from '~/types/analytics/Analytics';

export function useNavigationPageTracking(analytics: UseAnalyticsReturn) {
    const { category } = useCategory();
    const pageTypeMapping: Record<string, string> = {
        product_list: 'category',
        landingpage: 'unknown',
        page: 'unknown',
    };
    const pageType = category?.value?.cmsPage?.type
        ? pageTypeMapping[category.value.cmsPage.type] ?? 'unknown'
        : 'unknown';

    usePageTracking(analytics, pageType);

    if (pageType === 'category') {
        useProductListPageTracking(analytics);
    }
}
