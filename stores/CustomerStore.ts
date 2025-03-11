import type { Schemas } from '@shopware/api-client/api-types';

export const useCustomerStore = defineStore('customer', () => {
    const { refreshSessionContext, sessionContext } = useSessionContext();
    const { login, logout, register } = useUser();
    const { resetPassword } = useCustomerPassword();
    const loading = ref(true);

    const customer = computed((): Schemas['Customer'] => sessionContext.value?.customer);
    const signedIn = computed(() => !!sessionContext.value?.customer);

    const refreshContext = async () => {
        loading.value = true;
        await refreshSessionContext();
        loading.value = false;
    };

    return {
        refreshContext,
        customer,
        signedIn,
        login,
        logout,
        loading,
        register,
        resetPassword,
    };
});
