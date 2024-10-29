import type { UseAnalyticsReturn } from '../../../types/analytics/analytics';

export function usePageTracking({ trackPage, isPageTrackingReady }: UseAnalyticsReturn, pageType: string) {
    const { path } = useRoute();

    whenever(
        isPageTrackingReady,
        () => {
            const isHomePage = path === '/';
            if (isHomePage) {
                trackPage('home');
            } else {
                trackPage(pageType);
            }
        },
        { once: true, immediate: true },
    );
}
