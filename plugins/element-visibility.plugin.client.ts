export default defineNuxtPlugin({
    parallel: true,
    enforce: 'pre',
    order: -20,
    setup: (nuxtApp) => {

        nuxtApp.vueApp.directive('cms-page', {});
        nuxtApp.vueApp.directive('cms-element', {});
        nuxtApp.vueApp.directive('cms-element-lazy-load', {});

        const pageConfig = nuxtApp.payload.data['cmsPageConfig'];
        const { watchCsrPageVisibility } = useCmsPageVisibility(pageConfig);

        watchCsrPageVisibility();

    }
});