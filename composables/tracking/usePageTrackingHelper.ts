import type { TrackingPageMetaEvents } from '../../types/analytics/page';

export function usePageTrackingHelper() {
    const sessionCookie = useCookie('session-');
    const customerStore = useCustomerStore();
    const { customer } = storeToRefs(customerStore);
    const { path } = useRoute();
    const { sessionContext, languageId } = useSessionContext();
    const { getLanguageCodeFromId } = useInternationalization();
    const { isMobile, isTablet } = useDevice();

    const getDeviceType = () => {
        if (isMobile) {
            return 'mobile';
        }

        if (isTablet) {
            return 'tablet';
        }

        return 'desktop';
    };

    const getPageTrackingEvent = (pageType: string): TrackingPageMetaEvents => {
        const event = {
            session_id: sessionCookie.value ?? undefined,
            page_type: pageType,
            page_path: path,
            country: sessionContext.value?.shippingLocation?.country?.iso,
            language: languageId.value && getLanguageCodeFromId(languageId.value),
            login_status: 'logged-out',
            device: getDeviceType(),
        };

        if (customer.value) {
            return {
                ...event,
                user_id: customer.value.id,
                customer_group: customer.value.group?.name,
                login_status: 'logged-in',
                mail: customer.value.email,
            };
        }

        return event;
    };

    return {
        getPageTrackingEvent,
    };
}
