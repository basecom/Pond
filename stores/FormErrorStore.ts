import type { ResolvedApiError } from '~/types/errors';

export const useFormErrorStore = defineStore('formErrors', () => {
    const { resolveApiErrors } = useApiErrorsResolver();
    const apiErrors = ref<ResolvedApiError[]>([]);

    const formErrors = errors => {
        apiErrors.value = resolveApiErrors(errors);
        console.log('a', apiErrors.value);
        return apiErrors;
    };

    return {
        formErrors,
        apiErrors,
    };
});
