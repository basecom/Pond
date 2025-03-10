import type { Schemas } from '@shopware/api-client/api-types';

export const useCustomerStore = defineStore('customer', () => {
    const { sessionContext } = useSessionContext();
    const { login, logout, register } = useUser();
    const { resetPassword } = useCustomerPassword();
    const { isRecoveryHashValid, recoverPassword } = usePasswordRecovery();

    const customer = computed((): Schemas['Customer'] => sessionContext.value?.customer);
    const signedIn = computed(() => !!sessionContext.value?.customer);

    return {
        customer,
        signedIn,
        login,
        logout,
        register,
        resetPassword,
        isRecoveryHashValid,
        recoverPassword,
    };
});
