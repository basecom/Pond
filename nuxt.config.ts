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
        'nuxt-swiper',
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
        dirs: [join(currentDir, 'components')],
        global: true,
    },
    tailwindcss: {
        config: {
            content: [join(currentDir, 'formkit.theme.ts')],
        },
    },
    css: ['~/node_modules/@glidejs/glide/dist/css/glide.core.min.css'],
});
