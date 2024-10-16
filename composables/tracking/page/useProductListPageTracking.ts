import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useProductListPageTracking(analytics: UseAnalyticsReturn) {
    const { category } = useCategory();
    const { getElements } = useCategoryListing();
    const _initialTrackingDone = ref(false);
    const { loading } = storeToRefs(useCustomerStore());

    const unwatch = watch([category, getElements], () => {
        if (_initialTrackingDone.value) {
            unwatch();
            return;
        }

        if (!category.value || !getElements.value.length) {
            return;
        }

        _initialTrackingDone.value = true;
        analytics.trackViewItemList(getElements.value);
    }, { immediate: true });

    watchEffect(() => {
        if (loading.value) {
            return;
        }
        console.log(111, category?.value?.cmsPage?.type);
        const pageTypeMapping: Record<string, string> = {
            product_list: 'category',
            landingpage: 'home',
        };
        const pageType = category?.value?.cmsPage?.type
            ? pageTypeMapping[category.value.cmsPage.type] ?? 'unknown'
            : 'unknown';

        analytics.trackPage(pageType);
    });
}