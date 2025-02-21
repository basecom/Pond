import type { ResolvedApiError } from '~/types/Errors';
import { ApiClientError, type ApiError } from '@shopware/api-client';

export const useFormErrorStore = defineStore('formErrors', () => {
    const { resolveApiErrors } = useApiErrorsResolver();
    const apiErrors: Ref<ResolvedApiError[]> = ref([]);

    const formErrors = (errors: ApiError[]) => {
        apiErrors.value = resolveApiErrors(errors);
        return apiErrors;
    };

    const handleError = (
        error: ApiClientError<never>,
        fallback: ResolvedApiError = { key: 'general', code: 'GENERAL_ERROR' },
    ) => {
        if (error instanceof ApiClientError) {
            formErrors(error.details);
            return;
        }

        apiErrors.value.push(fallback);
    };

    function $reset() {
        apiErrors.value = [];
    }

    return {
        formErrors,
        handleError,
        apiErrors,
        $reset,
    };
});
