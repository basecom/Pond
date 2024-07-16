import type { Schemas } from '@shopware/api-client/api-types';

export const useCustomerStore = defineStore('customer', () => {
    const { refreshSessionContext, sessionContext } = useSessionContext();
    const { login, logout, register } = useUser();
    const loading = ref(true);

    async function refreshContext() {
        loading.value = true;
        await refreshSessionContext();
        loading.value = false;
    }

    const customer = computed((): Schemas['Customer'] => sessionContext.value?.customer);
    const signedIn = computed(() => !!sessionContext.value?.customer);

    return {
        refreshContext,
        customer,
        signedIn,
        login,
        logout,
        loading,
        register,
    };
});
