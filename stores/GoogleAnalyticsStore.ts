export type GoogleAnalyticsStoreReturn = {
    updateConsent: (activeCookies: string[]) => void;
};

export const useGoogleAnalyticsStore = defineStore('googleAnalytics', (): GoogleAnalyticsStoreReturn => {
    const _cookieEnabledName = 'google-analytics-enabled';
    const _cookieAdsEnabledName = 'google-ads-enabled';
    // TODO: Modify to take the value from configuration
    const _isGoogleAnalyticsEnabled = ref(true);
    // TODO: Modify to take the value from configuration
    const _googleAnalyticsId = ref('GTM-XXXXXXX');
    const _isEnabled = ref(false);
    const { gtag, initialize } = useGtag();

    const _initializeAnalytics = () => {
        if (!_isGoogleAnalyticsEnabled.value || _isEnabled.value) {
            return;
        }

        _isEnabled.value = true;
        initialize(_googleAnalyticsId.value);
    };

    const updateConsent = (activeCookies: string[]) => {
        if (activeCookies.includes(_cookieEnabledName)) {
            _initializeAnalytics();
        }

        gtag('consent', 'update', {
            ad_user_data: activeCookies.includes(_cookieAdsEnabledName) ? 'granted' : 'denied',
            ad_personalization: activeCookies.includes(_cookieAdsEnabledName) ? 'granted' : 'denied',
            ad_storage: activeCookies.includes(_cookieAdsEnabledName) ? 'granted' : 'denied',
            analytics_storage: activeCookies.includes(_cookieEnabledName) ? 'granted' : 'denied',
        });
    };

    return {
        updateConsent,
    };
});
