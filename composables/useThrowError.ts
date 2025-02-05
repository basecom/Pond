import { ApiClientError } from '@shopware/api-client';

export function useThrowError() {
    const throwError = (error: unknown) => {
        if (error instanceof ApiClientError && process.env.NODE_ENV === 'development') {
            console.log(error.details);
        }
    };

    return { throwError };
}
