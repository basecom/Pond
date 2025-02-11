import { type CookieEntry, type CookieGroup, useCookieGroupsHelper } from '../composables/useCookieGroupsHelper';
import type { CaptchaConfiguration } from '~/types/captchaConfiguration';

export const useCookieBannerStore = defineStore('cookie-banner', () => {
    const { defaultCookieGroup, filterCookieGroups } = useCookieGroupsHelper();
    const _cookieGroups = ref<CookieGroup[]>(defaultCookieGroup);
    const _activatedCookies = ref<CookieEntry['cookie'][]>([]);
    const { isEnabled } = useAnalyticsConfig();
    const configStore = useConfigStore();
    const _isWishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean | null;
    const _isAcceptAllEnabled = configStore.get('core.basicInformation.acceptAllCookies') as boolean | null;
    const _captchaConfig = configStore.get('core.basicInformation.activeCaptchasV2') as CaptchaConfiguration|null;
    const _isCaptchaV2Enabled: ComputedRef<boolean> = computed(
        () => _captchaConfig?.googleReCaptchaV2?.isActive ?? false,
    );
    const _isCaptchaV3Enabled: ComputedRef<boolean> = computed(
        () => _captchaConfig?.googleReCaptchaV3?.isActive ?? false,
    );
    const _cookiePreference = useCookie('cookie-preference');

    const cookieGroups = computed(() =>
        filterCookieGroups(_cookieGroups.value, {
            isGoogleAnalyticsEnabled: isEnabled.value,
            isWishlistEnabled: _isWishlistEnabled ?? false,
            isCaptchaV2Enabled: _isCaptchaV2Enabled.value,
            isCaptchaV3Enabled: _isCaptchaV3Enabled.value,
        }),
    );
    const activatedCookies = computed(() => _activatedCookies.value);
    const isAcceptAllEnabled = computed(() => _isAcceptAllEnabled);
    const showCookieBanner = computed(() => !_cookiePreference.value || _cookiePreference.value.toString() !== '1');

    const initializeCookies = () => {
        _activatedCookies.value = filterCookieGroups(_cookieGroups.value, {
            isGoogleAnalyticsEnabled: isEnabled.value,
            isWishlistEnabled: _isWishlistEnabled ?? false,
            isCaptchaV2Enabled: _isCaptchaV2Enabled.value,
            isCaptchaV3Enabled: _isCaptchaV3Enabled.value,
        })
            .flatMap(group => group.entries)
            .filter(entry => entry.value)
            .map(entry => entry.cookie)
            .filter(cookie => cookie && useCookie(cookie).value);
    };

    const updateCookies = (active: CookieEntry['cookie'][], inactive: CookieEntry['cookie'][]) => {
        const allCookies = _cookieGroups.value.flatMap(group => group.entries);

        active.forEach(cookie => {
            const entry = allCookies.find(cookieEntry => cookieEntry.cookie === cookie);

            if (!entry || !entry.value) {
                return;
            }

            const cookieRef = useCookie(cookie, { maxAge: entry.expiration });
            cookieRef.value = entry.value;
        });

        inactive.forEach(cookie => {
            useCookie(cookie).value = undefined;
        });

        _activatedCookies.value = active.slice(0);
    };

    const acceptAll = () => {
        if (!_isAcceptAllEnabled) {
            return;
        }
        const allCookies = filterCookieGroups(_cookieGroups.value, {
            isGoogleAnalyticsEnabled: isEnabled.value,
            isWishlistEnabled: _isWishlistEnabled ?? false,
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
            isGoogleAnalyticsEnabled: isEnabled.value,
            isWishlistEnabled: _isWishlistEnabled ?? false,
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
