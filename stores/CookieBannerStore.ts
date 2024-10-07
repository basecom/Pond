import { type CookieEntry, type CookieGroup, useCookieGroupsHelper } from '../composables/useCookieGroupsHelper';

export const useCookieBannerStore = defineStore('cookie-banner', () => {
    const { defaultCookieGroup, filterCookieGroups } = useCookieGroupsHelper();
    const _cookieGroups = ref<CookieGroup[]>(defaultCookieGroup);
    const _activatedCookies = ref<CookieEntry['cookie'][]>([]);
    // TODO: Modify to take the value from configuration
    const _isGoogleAnalyticsEnabled = ref(true);
    // TODO: Modify to take the value from configuration
    const _isCaptchaV2Enabled = ref(false);
    // TODO: Modify to take the value from configuration
    const _isCaptchaV3Enabled = ref(false);
    // TODO: Modify to take the value from configuration
    const _isWishlistEnabled = ref(false);
    // TODO: Modify to take the value from configuration
    const _isAcceptAllEnabled = ref(true);
    const _showCookieBanner = ref(false);

    const cookieGroups = computed(() =>
        filterCookieGroups(_cookieGroups.value, {
            isGoogleAnalyticsEnabled: _isGoogleAnalyticsEnabled.value,
            isWishlistEnabled: _isWishlistEnabled.value,
            isCaptchaV2Enabled: _isCaptchaV2Enabled.value,
            isCaptchaV3Enabled: _isCaptchaV3Enabled.value,
        }),
    );
    const activatedCookies = computed(() => _activatedCookies.value);
    const isAcceptAllEnabled = computed(() => _isAcceptAllEnabled.value);
    const showCookieBanner = computed(() => _showCookieBanner.value);

    const updateBannerVisibility = () => {
        const cookiePreference = useCookie('cookie-preference').value;

        _showCookieBanner.value = !cookiePreference || cookiePreference.toString() !== '1';
    };

    const initializeCookies = () => {
        _activatedCookies.value = filterCookieGroups(_cookieGroups.value, {
            isGoogleAnalyticsEnabled: _isGoogleAnalyticsEnabled.value,
            isWishlistEnabled: _isWishlistEnabled.value,
            isCaptchaV2Enabled: _isCaptchaV2Enabled.value,
            isCaptchaV3Enabled: _isCaptchaV3Enabled.value,
        })
            .flatMap(group => group.entries)
            .filter(entry => entry.value)
            .map(entry => entry.cookie)
            .filter(cookie => {
                return cookie && useCookie(cookie).value;
            });
        updateBannerVisibility();
    };

    const updateCookies = (active: CookieEntry['cookie'][], inactive: CookieEntry['cookie'][]) => {
        const allCookies = _cookieGroups.value.flatMap(group => group.entries);

        active.forEach(cookie => {
            const entry = allCookies.find(entry => entry.cookie === cookie);

            if (!entry || !entry.value) {
                return;
            }

            useCookie(cookie, { maxAge: entry.expiration }).value = entry.value;
        });

        inactive.forEach(cookie => {
            useCookie(cookie).value = undefined;
        });

        _activatedCookies.value = active.slice(0);
        updateBannerVisibility();
    };

    const acceptAll = () => {
        if (!_isAcceptAllEnabled.value) {
            return;
        }
        const allCookies = filterCookieGroups(_cookieGroups.value, {
            isGoogleAnalyticsEnabled: _isGoogleAnalyticsEnabled.value,
            isWishlistEnabled: _isWishlistEnabled.value,
            isCaptchaV2Enabled: _isCaptchaV2Enabled.value,
            isCaptchaV3Enabled: _isCaptchaV3Enabled.value,
        })
            .flatMap(group => group.entries)
            .filter(entry => entry.value)
            .map(entry => entry.cookie);

        updateCookies(allCookies, []);
    };

    const denyAll = () => {
        const allCookies = filterCookieGroups(_cookieGroups.value, {
            isGoogleAnalyticsEnabled: _isGoogleAnalyticsEnabled.value,
            isWishlistEnabled: _isWishlistEnabled.value,
            isCaptchaV2Enabled: _isCaptchaV2Enabled.value,
            isCaptchaV3Enabled: _isCaptchaV3Enabled.value,
        })
            .flatMap(group => group.entries)
            .filter(entry => entry.value);
        const allCookieValues = allCookies.map(entry => entry.cookie);
        const cookieConsent = allCookies.find(cookie => cookie.cookie === 'cookie-preference');

        updateCookies([], allCookieValues);

        if (cookieConsent?.value) {
            useCookie(cookieConsent.cookie, { maxAge: cookieConsent.expiration }).value = cookieConsent.value;
        }

        updateBannerVisibility();
    };

    return {
        cookieGroups,
        activatedCookies,
        isAcceptAllEnabled,
        showCookieBanner,
        updateCookies,
        denyAll,
        acceptAll,
        initializeCookies,
    };
});
