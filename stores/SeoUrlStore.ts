export const useSeoUrlStore = defineStore('seoUrl', {
    state: () => ({
        navigationId: '',
    }),
    actions: {
        setNavigationId(navigation: string) {
            this.navigationId = navigation;
        },
        clearNavigationId() {
            this.navigationId = '';
        },
    },
});
