export function useAuthentication() {
    const { signedIn, loading } = storeToRefs(useCustomerStore());
    const { refreshContext } = useCustomerStore();

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
    }

    const sessionContextLoaded = async () => {
        if (loading.value) {
            await refreshContext();
        }
    }

    return {
        rerouteIfLoggedIn,
        rerouteIfLoggedOut,
    };
}
