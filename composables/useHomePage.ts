export function useHomePage() {
    const { path } = useRoute();
    const isHomePage = computed(() => {
        console.log(999, path);
        return path === '/';
    });

    return {
        isHomePage,
    };
}
