export function usePondAuthentication() {
    const { signedIn } = storeToRefs(useCustomerStore());
    const { formatLink } = useInternationalization();

    const rerouteIfLoggedOut = async (targetRoute: string = '/account/login') => {
        if (!signedIn.value) {
            navigateTo(formatLink(targetRoute));
        }
    };

    return {
        rerouteIfLoggedOut,
    };
}
