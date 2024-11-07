import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useProductListPageTracking(analytics: UseAnalyticsReturn) {
    const { category } = useCategory();
    const { getElements } = useCategoryListing();
    const isPlpPageReady = computed(() => !!category.value && !!getElements.value.length);

    whenever(
        isPlpPageReady,
        () => {
            analytics.trackViewItemList(getElements.value);
        },
        { once: true, immediate: true },
    );
}
