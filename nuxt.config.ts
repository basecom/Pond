import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@formkit/auto-animate/nuxt',
        '@vueuse/nuxt',
        'radix-vue/nuxt',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@formkit/nuxt',
        '@nuxtjs/i18n',
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
                accessTokenAT: '',
            },
        },
    },
    imports: {
        dirs: [
            join(currentDir, 'composables/**'),
            join(currentDir, 'utils'),
            './node_modules/@shopware-pwa/composables-next/composables',
        ],
    },
    formkit: {
        autoImport: true,
    },
    fonts: {
        defaults: {
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            styles: ['normal', 'italic'],
        },
    },
    components: {
        dirs: [join(currentDir, 'components'), join(currentDir, 'components/*')],
        global: true,
    },
    tailwindcss: {
        config: {
            content: [join(currentDir, 'formkit.theme.ts')],
        },
    },
    css: ['~/node_modules/@glidejs/glide/dist/css/glide.core.min.css'],
    i18n: {
        vueI18n: './i18n.config.ts',
        strategy: 'prefix_except_default',
        defaultLocale: 'de-DE',
        detectBrowserLanguage: false,
        locales: [
            {
                code: 'de-DE',
                file: 'i18n/de-DE/de-DE.ts',
            },
            {
                code: 'en-GB',
                file: 'i18n/en-GB/en-GB.ts',
            },
        ],
    },
});
