export type FilterCookieGroupConfig = {
    isGoogleAnalyticsEnabled: boolean;
    isWishlistEnabled: boolean;
    isCaptchaV2Enabled: boolean;
    isCaptchaV3Enabled: boolean;
};

export type CookieEntry = {
    id: string;
    name: string;
    cookie: string;
    value?: string;
    expiration?: number;
    hidden?: boolean;
};

export type CookieGroup = {
    id: string;
    name: string;
    description?: string;
    entries: CookieEntry[];
    required?: boolean;
};

export function useCookieGroupsHelper() {
    const defaultCookieGroup: CookieGroup[] = [
        {
            id: 'required',
            name: 'cookie.groups.required.name',
            description: 'cookie.groups.required.description',
            entries: [
                {
                    id: 'session',
                    name: 'cookie.groups.required.entries.session',
                    cookie: 'session',
                },
                {
                    id: 'timezone',
                    name: 'cookie.groups.required.entries.timezone',
                    cookie: 'timezone',
                },
                {
                    id: 'cookie-preference',
                    name: '',
                    cookie: 'cookie-preference',
                    value: '1',
                    expiration: 30,
                    hidden: true,
                },
                {
                    id: 'captcha',
                    name: 'cookie.groups.required.entries.captcha',
                    cookie: '_GRECAPTCHA',
                    value: '1',
                },
            ],
            required: true,
        },
        {
            id: 'statistics',
            name: 'cookie.groups.statistics.name',
            description: 'cookie.groups.statistics.description',
            entries: [
                {
                    id: 'google-analytics',
                    name: 'cookie.groups.statistics.entries.googleAnalytics',
                    cookie: 'google-analytics-enabled',
                    expiration: 30,
                    value: '1',
                },
            ],
        },
        {
            id: 'comfort-features',
            name: 'cookie.groups.comfortFeatures.name',
            entries: [
                {
                    id: 'wishlist',
                    name: 'cookie.groups.comfortFeatures.entries.wishlist',
                    cookie: 'wishlist-enabled',
                    value: '1',
                },
                {
                    id: 'youtube-video',
                    name: 'cookie.groups.comfortFeatures.entries.youtubeVideo',
                    cookie: 'youtube-video',
                    expiration: 30,
                    value: '1',
                },
            ],
        },
        {
            id: 'marketing',
            name: 'cookie.groups.marketing.name',
            description: 'cookie.groups.marketing.description',
            entries: [
                {
                    id: 'google-ads',
                    name: 'cookie.groups.marketing.entries.googleAds',
                    cookie: 'google-ads-enabled',
                    expiration: 30,
                    value: '1',
                },
            ],
        },
    ];

    const filterCookieGroups = (cookieGroup: CookieGroup[], config: FilterCookieGroupConfig): CookieGroup[] => {
        return cookieGroup
            .map(group => {
                return {
                    ...group,
                    entries: group.entries.filter(entry => {
                        const isAnalytics = entry.id === 'google-analytics';
                        if (isAnalytics && !config.isGoogleAnalyticsEnabled) {
                            return false;
                        }

                        const isWishlist = entry.id === 'wishlist';
                        if (isWishlist && !config.isWishlistEnabled) {
                            return false;
                        }

                        const isCaptcha = entry.id === 'captcha';
                        if (isCaptcha && !config.isCaptchaV2Enabled && !config.isCaptchaV3Enabled) {
                            return false;
                        }

                        return true;
                    }),
                };
            })
            .filter(group => group.entries.length > 0);
    };

    return {
        defaultCookieGroup,
        filterCookieGroups,
    };
};
