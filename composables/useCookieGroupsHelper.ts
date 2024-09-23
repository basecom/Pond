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

export const useCookieGroupsHelper = () => {
    const defaultCookieGroup: CookieGroup[] = [
        {
            id: 'required',
            name: 'Technically required',
            description: 'Cookies required for this shop to function:',
            entries: [
                {
                    id: 'session',
                    name: 'Session',
                    cookie: 'session',
                },
                {
                    id: 'timezone',
                    name: 'Timezone',
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
                    name: 'CAPTCHA integration',
                    cookie: '_GRECAPTCHA',
                    value: '1',
                },
            ],
            required: true,
        },
        {
            id: 'statistics',
            name: 'Statistics',
            description: 'Cookies used for statistics and shop performance metrics.',
            entries: [
                {
                    id: 'google-analytics',
                    name: 'Google Analytics',
                    cookie: 'google-analytics-enabled',
                    expiration: 30,
                    value: '1',
                },
            ],
        },
        {
            id: 'comfort-features',
            name: 'Comfort features',
            entries: [
                {
                    id: 'wishlist',
                    name: 'Wishlist',
                    cookie: 'wishlist-enabled',
                    value: '1',
                },
                {
                    id: 'youtube-video',
                    name: 'YouTube video',
                    cookie: 'youtube-video',
                    expiration: 30,
                    value: '1',
                },
            ],
        },
        {
            id: 'marketing',
            name: 'Marketing',
            description: 'Allows Google to collect personal data for online advertising and marketing.',
            entries: [
                {
                    id: 'google-ads',
                    name: 'Google Advertising',
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
