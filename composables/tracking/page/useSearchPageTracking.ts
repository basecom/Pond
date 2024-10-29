import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useSearchPageTracking(analytics: UseAnalyticsReturn) {
    const { getElements } = useProductSearchListing();
    const { sessionContext } = useSessionContext();
    const isSearchPageReady = computed(() => !!getElements.value.length && !!sessionContext.value);

    usePageTracking(analytics, 'search');
    whenever(
        isSearchPageReady,
        () => {
            analytics.trackViewItemList(getElements.value);
        },
        { once: true, immediate: true },
    );
}