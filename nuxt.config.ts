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
    imports: {
        dirs: ['./composables/**', './utils', './node_modules/@shopware-pwa/composables-next/composables'],
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
        dirs: ['~/components'],
        global: true,
    },
});
