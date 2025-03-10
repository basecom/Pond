import { ApiClientError } from '@shopware/api-client';

export function useHandleError() {
    const handleError = (error: unknown | string, showAsError: boolean = true) => {
        if (process.env.NODE_ENV !== 'development') return;

        if (error instanceof ApiClientError) {
            showError(error.details, showAsError);
            return;
        }

        showError(error, showAsError);
    };

    const showError = (errorMessage: unknown | string, showAsError: boolean = true) => {
        if (showAsError) {
            console.error(errorMessage);
            return;
        }

        console.warn(errorMessage);
    };

    return { handleError };
}
