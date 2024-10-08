export function useAuthentication() {
    const { signedIn } = useCustomerStore();

    const authenticate = () => {
        if (!signedIn) {
            navigateTo('/account/login');
        }
    };

    return {
        authenticate,
    };
}
