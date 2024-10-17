import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useCmsPageTracking(analytics: UseAnalyticsReturn) {
    const { category } = useCategory();
    const { getElements } = useCategoryListing();
    const _initialTrackingDone = ref(false);

    const unwatch = watch([category, getElements], () => {
        if (_initialTrackingDone.value) {
            unwatch();
            return;
        }

        if (!category.value || !getElements.value.length) {
            return;
        }

        _initialTrackingDone.value = true;
        if (category.value.cmsPage.type === 'product_list') {
            analytics.trackViewItemList(getElements.value);
        }
    }, { immediate: true });
}