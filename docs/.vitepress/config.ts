import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Pond',
    description: 'Awesome production-ready headless shopware storefront',
    themeConfig: {
        logo: '/logo.png',
        search: {
            provider: 'local',
        },

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Getting started', link: '/getting-started' },
            { text: 'Contribute', link: '/contribute' },
        ],

        sidebar: [
            {
                text: 'Basics',
                items: [
                    { text: 'Getting started', link: '/getting-started' },
                    { text: 'Installation', link: '/installation' },
                    { text: 'Supported versions', link: '/supported-versions' },
                    { text: 'Changelog', link: '/changelog' },
                ],
            },
            {
                text: 'Features',
                items: [
                    { text: 'Account Management', link: '/features/account-management' },
                    { text: 'Internationalization', link: '/features/internationalization' },
                    { text: 'Companion Plugin', link: '/features/companion-plugin' },
                    { text: 'Product Listings', link: '/features/product-listings' },
                    { text: 'Cart & Checkout', link: '/features/cart-checkout' },
                    { text: 'Sitemap & robots.txt', link: '/features/sitemap-robots' },
                    { text: 'Wishlist', link: '/features/wishlist' },
                    { text: 'Maintenance mode', link: '/features/maintenance-mode' },
                    { text: 'CMS', link: '/features/cms' },
                ],
            },
            {
                text: 'How-Tos',
                collapsed: true,
                items: [
                    { text: 'Customize design tokens', link: '/how-to/customize-design-tokens' },
                    { text: 'Add payment provider', link: '/how-to/add-payment-provider' },
                    { text: 'Add custom page', link: '/how-to/add-custom-page' },
                    { text: 'Create custom CMS blocks & elements', link: '/how-to/create-custom-cms' },
                    { text: 'Replace whole CMS', link: '/how-to/replace-whole-cms' },
                ],
            },
            {
                text: 'Technical',
                collapsed: true,
                items: [
                    { text: 'Technical introduction', link: '/technical/introduction' },
                    { text: 'Architecture', link: '/technical/architecture' },
                    { text: 'Composables', link: '/technical/composables' },
                    { text: 'API Routes', link: '/technical/api-routes' },
                ],
            },
            {
                text: 'Contribute',
                collapsed: true,
                items: [
                    { text: 'Contributing', link: '/contribute' },
                    { text: 'Local development setup', link: '/contribute/local-development-setup' },
                    { text: 'Code of Conduct', link: '/contribute/code-of-conduct' },
                    { text: 'Code Style', link: '/contribute/code-style' },
                    { text: 'Core Team', link: '/contribute/core-team' },
                ],
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/basecom/Pond' },
            { icon: 'npm', link: 'https://www.npmjs.com/package/@basecom-gmbh/pond' },
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present <a href="https://basecom.de">basecom</a>',
        },

        editLink: {
            pattern: 'https://github.com/basecom/pond/edit/main/docs/:path',
        },

        lastUpdated: true,
    },
});
