import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function usePageTracking({ trackPage, isPageTrackingReady }: UseAnalyticsReturn, pageType: string) {
    const { isHomePage } = useHomePage();

    whenever(
        isPageTrackingReady,
        () => {
            if (isHomePage.value) {
                trackPage('home');
            } else {
                trackPage(pageType);
            }
        },
        { once: true, immediate: true },
    );
}
