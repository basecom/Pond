import type { ApiError } from "@shopware/api-client";
import type { ResolvedApiError, UseApiErrorsResolver } from '~/types/errors';

export function useApiErrorsResolver(): UseApiErrorsResolver {
  /**
   * This function resolves the api errors into a structure where its clearly visible which field is (key) is affected by which error (code)
   * @param errors
   */
  const resolveApiErrors = (errors: ApiError[]): ResolvedApiError[] => {
    return errors.map(({ detail, code , source}) => {
      if (code) {
        return {
          key: formatErrorSourcePointer(source?.pointer),
          code: code
        };
      }

      return {
        key: formatErrorSourcePointer(source?.pointer),
        code: detail ?? "No details provided"
      };
    });
  };


  /**
   * The api response might contain the key in form of `/firstName` or `/billingAddress/city`
   * This function transforms this into the key we hat initially had, usually the `name` attribute of the input
   * @param input
   */
  function formatErrorSourcePointer(input: string|undefined) {
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
  }

  return {
    resolveApiErrors,
  };
}
