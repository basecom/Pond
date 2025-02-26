import type { NuxtApp, NuxtError } from '#app';
import type { AsyncData, KeysOf, PickFrom } from '#app/composables/asyncData';
import type {AsyncDataOptions} from '~/types/AsyncDataOptions';

/**
 * @param forceRefresh - if true, the data will be fetched from the server and any cached data will be ignored
 *
 * @param noRefresh - if true, the cached data will be used even if it is expired
 * You can call useCachedAsyncData that way with a unique key in multiple instances and the data will be fetched only once.
 * This way you can use data in multiple components without fetching it multiple times.
 *
 * @param validTimeSeconds - the time in seconds after which the cached data will be considered expired defaults to 60 seconds
 *
 * @param debug - if true, the console will log information about the cache status
 */

export async function usePondCacheAsyncData<ResT, DataT = ResT>(
    key: string,
    asyncData: (ctx?: NuxtApp) => Promise<DataT>,
    options?: AsyncDataOptions,
): Promise<AsyncData<PickFrom<DataT, KeysOf<DataT>> | undefined, NuxtError<unknown> | undefined>> {
    return useAsyncData<DataT>(key, asyncData, {
        transform(inputData) {
            return {
                ...inputData,
                fetchedAt: new Date(),
                server: import.meta.server,
            };
        },
        getCachedData(key) {
            if (options?.forceRefresh) return null;

            const cachedData = useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];

            if (!cachedData) {
                if (options?.debug) console.info('No cached data found for key:', key);
                return null;
            }

            /**
             * If cached data exists and was generated on the server we assume data is valid
             * even if, due to the serverside caching, the data is already "expired".
             * */
            if (cachedData.server) {
                if (options?.debug) console.info('Using server data for key:', key);
                return cachedData;
            }

            cachedData.server = false;
            const expiresAt = new Date(cachedData.fetchedAt);
            expiresAt.setTime(expiresAt.getTime() + 1000 * (options?.validTimeSeconds || 60));

            if (expiresAt.getTime() < new Date().getTime() && !options?.noRefresh) {
                if (options?.debug) console.info('Cached data expired for key:', key);
                return null;
            }

            if (options?.debug) console.info('Using cached data for key:', key);
            return cachedData;
        },
        dedupe: 'defer',
        lazy: false,
    });
}
