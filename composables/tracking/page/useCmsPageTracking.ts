import type { Schemas } from '@shopware/api-client/api-types';
import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function useCmsPageTracking(analytics: UseAnalyticsReturn) {
    const _category = useContext<Schemas['Category']>('category');
    const { loading } = storeToRefs(useCustomerStore());

    watchEffect(() => {
        if (loading.value) {
            return;
        }
        const pageTypeMapping: Record<string, string> = {
            product_list: 'category',
            landingpage: 'home',
        };
        const pageType = _category?.value?.cmsPage?.type
            ? pageTypeMapping[_category.value.cmsPage.type] ?? 'unknown'
            : 'unknown';

        analytics.trackPage(pageType);
    });
}