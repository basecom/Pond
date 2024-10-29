import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useProductListPageTracking(analytics: UseAnalyticsReturn) {
    const { category } = useCategory();
    const { getElements } = useCategoryListing();
    const isPlpPageReady = computed(() => !!category.value && !!getElements.value.length);
    const pageTypeMapping: Record<string, string> = {
        product_list: 'category',
        landingpage: 'unknown',
    };
    const pageType = category?.value?.cmsPage?.type
        ? pageTypeMapping[category.value.cmsPage.type] ?? 'unknown'
        : 'unknown';

    usePageTracking(analytics, pageType);

    whenever(
        isPlpPageReady,
        () => {
            analytics.trackViewItemList(getElements.value);
        },
        { once: true },
    );
}
