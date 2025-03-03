import type { ApiError } from '@shopware/api-client';

export type UseApiErrorsResolver = {
    resolveApiErrors(errors: ApiError[], context: string | null = null): ResolvedApiError[];
};

export type ResolvedApiError = { key: string | null; code: string };
