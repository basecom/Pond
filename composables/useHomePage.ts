export function useHomePage() {
    const { path } = useRoute();
    const isHomePage = computed(() => path === '/');

    return {
        isHomePage,
    };
}
