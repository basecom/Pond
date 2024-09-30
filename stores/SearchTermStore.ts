export const useSearchStore = defineStore('search', {
    state: () => ({
        searchTerm: '',
        lastValidSearchTerm: '',
    }),
    actions: {
        updateSearchTerm(newTerm: string) {
            this.searchTerm = newTerm;
        },
        updateLastValidSearchTerm(newTerm: string) {
            this.lastValidSearchTerm = newTerm;
        },
    },
});
