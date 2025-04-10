export function usePondAuthentication() {
    const { signedIn, loading } = storeToRefs(useCustomerStore());

    const rerouteIfLoggedOut = async (targetRoute: string = '/account/login') => {
        await sessionContextLoaded();
        if (!signedIn.value) {
            navigateTo(targetRoute);
        }
    };

    const rerouteIfLoggedIn = async (targetRoute: string = '/account') => {
        await sessionContextLoaded();
        if (signedIn.value) {
            navigateTo(targetRoute);
        }
    };

    const sessionContextLoaded = async () => {
        if (loading.value) {
            await until(loading).toBe(false);
        }
    };

    return {
        rerouteIfLoggedIn,
        rerouteIfLoggedOut,
    };
}