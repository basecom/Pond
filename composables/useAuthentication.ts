export function useAuthentication() {
    const { signedIn, loading, customer } = storeToRefs(useCustomerStore());

    const rerouteIfLoggedOut = async (targetRoute: string = '/account/login') => {
        await sessionContextLoaded();

        if(signedIn.value && customer.value?.guest) {
            navigateTo('/');
        }
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
