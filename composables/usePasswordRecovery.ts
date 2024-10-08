import type { operations } from '@shopware/api-client/api-types';

export function usePasswordRecovery() {
    const { apiClient } = useShopwareContext();

    async function recoverPassword(
        recoverPasswordData: operations['recoveryPassword post /account/recovery-password-confirm']['body'],
    ) {
        const response = await apiClient.invoke('recoveryPassword post /account/recovery-password-confirm', {
            body: recoverPasswordData,
        });
        return response.data;
    }

    async function isRecoveryHashValid(recoverHash: { hash: string }) {
        const response = await apiClient.invoke(
            'getCustomerRecoveryIsExpired post /account/customer-recovery-is-expired',
            {
                body: recoverHash,
            },
        );
        return response.data;
    }

    return {
        isRecoveryHashValid,
        recoverPassword,
    };
}
