import type { TrackingPageMetaEvents } from '../../types/analytics/page';

export function usePageTrackingHelper() {
    const customerStore = useCustomerStore();
    const { customer, loading } = storeToRefs(customerStore);
    const { path } = useRoute();
    const { sessionContext, languageId } = useSessionContext();
    const { getLanguageCodeFromId, languages } = useInternationalization();
    const { isMobile, isTablet } = useDevice();

    const isPageTrackingReady = computed(() => {
        const isUserInformationReady = !loading.value;
        const isLanguageInformationReady = languages.value?.length > 0;

        return isUserInformationReady && isLanguageInformationReady;
    });

    const getDeviceType = () => {
        if (isMobile) {
            return 'mobile';
        }

        if (isTablet) {
            return 'tablet';
        }

        return 'desktop';
    };

    const getPageTrackingEvent = (pageType: string, sessionId?: string): TrackingPageMetaEvents => {
        return {
            session_id: sessionId,
            page_type: pageType,
            page_path: path,
            country: sessionContext.value?.shippingLocation?.country?.iso,
            language: languageId.value && getLanguageCodeFromId(languageId.value),
            mail: customer.value?.email,
            user_id: customer.value?.id,
            customer_group: customer.value?.groupId,
            login_status: customer.value ? 'logged-in' : 'logged-out',
            device: getDeviceType(),
        };
    };

    return {
        getPageTrackingEvent,
        isPageTrackingReady,
    };
}
