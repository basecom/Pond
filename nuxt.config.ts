// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@formkit/auto-animate/nuxt',
        '@vueuse/nuxt',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxtjs/i18n',
        '@nuxt/icon',
    ],

    experimental: {
        asyncContext: true,
        sharedPrerenderData: true,
        typedPages: true,
        viewTransition: true,
    },

    features: {
        devLogs: true,
    },

    future: {
        compatibilityVersion: 4,
    },

    runtimeConfig: {
        public: {
            pond: {
                shopwareEndpoint: '',
                accessToken: '',
            },
        },
    },

    extends: ['@shopware-pwa/composables-next/nuxt-layer'],

    fonts: {
        defaults: {
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            styles: ['normal', 'italic'],
        },
    },

    icon: {
        serverBundle: {
            collections: ['mdi'],
        },
    },

    components: {
        dirs: ['components'],
        global: true,
    },

    i18n: {
        vueI18n: './i18n.config.ts',
        strategy: 'prefix_except_default',
        defaultLocale: 'de-DE',
        detectBrowserLanguage: false,
        locales: [
            {
                code: 'de-DE',
                file: 'de-DE/de-DE.ts',
            },
            {
                code: 'en-GB',
                file: 'en-GB/en-GB.ts',
            },
        ],
    },

    compatibilityDate: '2025-02-24',

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },
});
