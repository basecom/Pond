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
                text: 'How-Tos',
                collapsed: true,
                items: [
                    { text: 'CMS System', link: '/how-to/cms-system' },
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
