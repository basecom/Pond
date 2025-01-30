import type { ResolvedApiError } from '~/types/errors';
import { ApiClientError } from '@shopware/api-client';

export const useFormErrorStore = defineStore('formErrors', () => {
    const { resolveApiErrors } = useApiErrorsResolver();
    const apiErrors: Ref<ResolvedApiError[]> = ref([]);

    const formErrors = errors => {
        apiErrors.value = resolveApiErrors(errors);
        return apiErrors;
    };

    const handleError = (error, fallback: ResolvedApiError = { key: 'general', code: 'GENERAL_ERROR' }) => {
        if (error instanceof ApiClientError) {
            formErrors(error.details.errors);
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
