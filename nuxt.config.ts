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
        'shadcn-nuxt',
        '@shopware/nuxt-module',
        '@therealironduck/ducktory',
    ],

    experimental: {
        asyncContext: true,
        sharedPrerenderData: true,
        viewTransition: true,
    },

    features: {
        devLogs: true,
    },

    future: {
        compatibilityVersion: 4,
    },

    nitro: {
        preset: 'bun',
    },

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
                files: ['de-DE/account.json', 'de-DE/error.json', 'de-DE/general.json'],
            },
            {
                code: 'en-GB',
                files: ['en-GB/account.json', 'en-GB/error.json', 'en-GB/general.json'],
            },
        ],
        lazy: true,
    },

    compatibilityDate: '2025-02-24',

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },

    runtimeConfig: {
        public: {
            shopware: {
                endpoint: '',
                accessToken: '',
            },
        },
    },

    extends: ['@shopware/composables/nuxt-layer', '@shopware/cms-base-layer'],

    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },

    ducktory: {
        path: '/styleguide',
        debug: true,
    },
});
