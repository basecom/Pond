import { ApiClientError } from '@shopware/api-client';

export function useHandleError() {
    const handleError = (error: unknown) => {
        if (error instanceof ApiClientError && process.env.NODE_ENV === 'development') {
            console.error(error.details);
        }
    };

    return { handleError };
}
