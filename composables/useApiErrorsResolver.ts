import type { ApiError } from '@shopware/api-client';
import type { ResolvedApiError, UseApiErrorsResolver } from '~/types/errors';

export function useApiErrorsResolver(): UseApiErrorsResolver {
    const { t } = useI18n();

    /**
     * This function resolves the api errors into a structure where its clearly visible which field (key) is affected by which error (code)
     */
    const resolveApiErrors = (errors: ApiError[], context: string | null): ResolvedApiError[] => {
        return errors.map(({ detail, code, source }) => {
            return {
                key: source?.pointer ? formatErrorSourcePointer(source.pointer) : context,
                code: code ?? detail ?? t('composable.apiErrorsResolver.noDetails'),
            };
        });
    };

    /**
     * The api response might contain the key in form of `/firstName` or `/billingAddress/city`
     * This function transforms this into the key we hat initially had, usually the `name` attribute of the input
     */
    const formatErrorSourcePointer = (input: string | undefined): string => {
        if (!input) {
            return '';
        }

        const singleSlashPattern = /^\/([^/]+)$/;
        const doubleSlashPattern = /^\/([^/]+)\/([^/]+)$/;

        if (singleSlashPattern.test(input)) {
            // `/firstName` -> `firstName˙
            return input.replace(singleSlashPattern, '$1');
        } else if (doubleSlashPattern.test(input)) {
            // `/billingAddress/city` -> `billingAddress[city]`
            return input.replace(doubleSlashPattern, '$1[$2]');
        } else {
            // unchanged
            return input;
        }
    };

    return {
        resolveApiErrors,
    };
}
