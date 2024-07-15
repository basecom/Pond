export type UseApiErrorsResolver = {
    resolveApiErrors(errors: ResolvedApiError[]): {key: string, code: string}[];
};

export type ResolvedApiError = {key: string, code: string};