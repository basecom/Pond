import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useSearchPageTracking(analytics: UseAnalyticsReturn) {
    const { getElements } = useProductSearchListing();
    const { sessionContext } = useSessionContext();
    const isPlpPageReady = computed(() => !!getElements.value.length && !!sessionContext.value);

    usePageTracking(analytics, 'search');
    whenever(
        isPlpPageReady,
        () => {
            analytics.trackViewItemList(getElements.value);
        },
        { once: true, immediate: true },
    );
}