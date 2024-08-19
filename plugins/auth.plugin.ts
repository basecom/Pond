import type { ApiClient } from '#shopware';
import { ApiClientError } from '@shopware/api-client';

export default defineNuxtPlugin(() => {
    addRouteMiddleware('auth', () => {
        _fetchUserData().then(loggedIn => {
            if (loggedIn === true) {
                return;
            }

            return navigateTo('/account/login');
        });
    });
});

async function _fetchUserData() {
    const apiClient = inject<ApiClient>('apiClient');
    try {
        const _ = await apiClient.invoke('loadCustomer post /account/customer');
        return true;
    } catch (error) {
        if (error instanceof ApiClientError) {
            if (error.status === 403) {
                return false;
            }
        }
    }
}
