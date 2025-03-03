/**
 * The elements visibility functionality is composed of two phases:
 * CSR phase: On bootstrap of the application the cms page config is retrieved from the server.
 * The client then start watching for the lazy load configurations on the server html.
 * Once all the lazy load configurations are loaded for a particular element, the element is displayed.
 * If an element has no lazy load configurations, it is displayed immediately.
 *
 * This functionality, is used to prevent CLS on the page by hiding the next elements until the current one is loaded.
 *
 * This is needed because you might have a piece of HTML that the height is not known until some external resource is loaded.
 * e.g. you might not know the height of an image until it is loaded, some external functionality that is loaded via external script: comments or reviews.
 */
export default defineNuxtPlugin({
    parallel: true,
    enforce: 'pre',
    order: -20,
    setup: (nuxtApp) => {
        // We need to define empty directives to avoid nuxt errors
        nuxtApp.vueApp.directive('cms-page', {});
        nuxtApp.vueApp.directive('cms-element', {});
        nuxtApp.vueApp.directive('cms-element-lazy-load', {});

        const pageConfig = nuxtApp.payload.data['cmsPageConfig'];
        const { watchCsrPageVisibility } = useCmsPageVisibility(pageConfig);

        watchCsrPageVisibility();
    },
});
