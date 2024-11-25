import type { LocationQuery, LocationQueryRaw } from '#vue-router';
import type { ComputedRef } from 'vue';
import { getListingFilters } from '@shopware-pwa/helpers-next';
import type { operations, Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '../types/listing/filter';

export type ProductListingCriteria =
    | operations['readProductListing post /product-listing/{categoryId}']['body']
    | operations['searchPage post /search']['body'];

export type UseProductListingCriteriaResult = {
    criteria: ComputedRef<ProductListingCriteria | undefined>;
    appliedFilters: ComputedRef<Schemas['ProductListingResult']['currentFilters'] | undefined>;
    page: ComputedRef<Schemas['ProductListingResult']['page'] | undefined>;
    limit: ComputedRef<Schemas['ProductListingResult']['limit'] | undefined>;
    total: ComputedRef<Schemas['ProductListingResult']['total']>;
    filters: ComputedRef<ListingFilter[]>;
    areFiltersModified: ComputedRef<boolean>;
    sortingOptions: ComputedRef<Schemas['ProductListingResult']['availableSortings']>;
    currentSorting: ComputedRef<Schemas['ProductListingResult']['sorting']>;
    initializeCriteria: (defaultCriteria: Partial<ProductListingCriteria>, query: LocationQuery) => void;
    updateCriteria: (query: LocationQuery) => void;
    setSearchResult: (result: Schemas['ProductListingResult'], forceUpdateFilters?: boolean) => void;
    setFilters: (filters: Schemas['ProductListingResult']['currentFilters']) => void;
    setSorting: (sorting: Schemas['ProductListingResult']['sorting']) => void;
    setPage: (page: Schemas['ProductListingResult']['page']) => void;
    setLimit: (limit: Schemas['ProductListingResult']['limit']) => void;
    resetFilters: () => void;
};

export function useProductListingCriteria(): UseProductListingCriteriaResult {
    const route = useRoute();
    const router = useRouter();
    const { filterMapping, filterCodes } = useListingFiltersMapping();
    const _defaultCriteria = ref<Partial<ProductListingCriteria>>({});
    const _criteria = ref<ProductListingCriteria | undefined>(undefined);
    const _appliedFilters = ref<Schemas['ProductListingResult']['currentFilters'] | undefined>(undefined);
    const _page = ref<Schemas['ProductListingResult']['page'] | undefined>(undefined);
    const _limit = ref<Schemas['ProductListingResult']['limit'] | undefined>(undefined);
    const _total = ref<Schemas['ProductListingResult']['total'] | undefined>(undefined);
    const _sortingOptions = ref<Schemas['ProductListingResult']['availableSortings']>([]);
    const _currentSorting = ref<Schemas['ProductListingResult']['sorting'] | undefined>(undefined);
    const _filters = ref<ListingFilter[]>([]);
    const _areFiltersModified = ref(false);

    const criteria = computed(() => _criteria.value);
    const appliedFilters = computed(() => _appliedFilters.value);
    const filters = computed(() => _filters.value);
    const areFiltersModified = computed(() => _areFiltersModified.value);
    const sortingOptions = computed(() => _sortingOptions.value);
    const currentSorting = computed(() => _currentSorting.value);
    const limit = computed(() => _limit.value);
    const page = computed(() => _page.value);
    const total = computed(() => _total.value || 0);

    const _filtersToCriteria = (
        filters: Schemas['ProductListingResult']['currentFilters'],
    ): Partial<ProductListingCriteria> => {
        return filterCodes.reduce(
            (acc: Partial<ProductListingCriteria>, key: string): Partial<ProductListingCriteria> => {
                const urlMapper = filterMapping[key];

                if (!urlMapper) {
                    return acc;
                }

                const mapper = urlMapper();

                const partialCriteria = mapper.createCriteria(filters);

                return { ...acc, ...partialCriteria };
            },
            {} as Partial<ProductListingCriteria>,
        );
    };

    const _updateFiltersChanged = () => {
        const currentCriteria = _criteria.value;
        const defaultCriteria = _defaultCriteria.value;

        if (!currentCriteria) {
            _areFiltersModified.value = false;

            return;
        }

        _areFiltersModified.value = filterCodes.some((key: string): boolean => {
            const urlMapper = filterMapping[key];
            if (!urlMapper) {
                return false;
            }
            const mapper = urlMapper();

            return !mapper.isSameCriteria(currentCriteria, defaultCriteria);
        });
    };

    const _criteriaToUrl = (filters: Schemas['ProductListingCriteria']): LocationQueryRaw => {
        return filterCodes.reduce((acc: LocationQueryRaw, key: string): LocationQueryRaw => {
            const urlMapper = filterMapping[key];

            if (!urlMapper) {
                return acc;
            }

            const mapper = urlMapper();

            const partialQuery = mapper.encodeUrl(filters);

            return { ...acc, ...partialQuery };
        }, {} as LocationQueryRaw);
    };

    const _getFiltersFromQuery = (query: LocationQuery): Partial<Schemas['ProductListingCriteria']> => {
        return filterCodes.reduce(
            (
                acc: Partial<Schemas['ProductListingCriteria']>,
                key: string,
            ): Partial<Schemas['ProductListingCriteria']> => {
                const urlMapper = filterMapping[key];

                if (!urlMapper) {
                    return acc;
                }

                const mapper = urlMapper();

                const partialCriteria = mapper.decodeUrl(query);

                return { ...acc, ...partialCriteria };
            },
            {} as Partial<Schemas['ProductListingCriteria']>,
        );
    };

    const initializeCriteria = (defaultCriteria: Partial<ProductListingCriteria>, routeQuery: LocationQuery) => {
        _defaultCriteria.value = defaultCriteria;
        updateCriteria(routeQuery);
    };

    const updateCriteria = (routeQuery: LocationQuery) => {
        const defaultCriteria = _defaultCriteria.value;
        const filtersFromQuery = _getFiltersFromQuery(routeQuery);
        const sorting = routeQuery.sort ? (routeQuery.sort as string | undefined) : defaultCriteria.order;
        const limit = routeQuery.limit ? Number(routeQuery.limit) : defaultCriteria.limit;
        const page = routeQuery.p ? Number(routeQuery.p) : defaultCriteria.p;
        _criteria.value = {
            ..._defaultCriteria.value,
            ...filtersFromQuery,
            order: sorting,
            limit,
            p: page,
        };
        _updateFiltersChanged();
    };

    const setSearchResult = (result: Schemas['ProductListingResult'], forceUpdate?: boolean) => {
        _appliedFilters.value = result.currentFilters;
        _currentSorting.value = result.sorting;
        _limit.value = result.limit;
        _page.value = result.page;
        _total.value = result.total;

        if (_filters.value.length === 0 || forceUpdate) {
            _filters.value = getListingFilters(result.aggregations) as ListingFilter[];
        }

        if (_sortingOptions.value.length === 0) {
            _sortingOptions.value = result.availableSortings;
        }
    };

    const setFilters = (filters: Schemas['ProductListingResult']['currentFilters']) => {
        console.log('setFilters', filters);
        const criteria = _filtersToCriteria(filters);
        const query = _criteriaToUrl(criteria);

        _criteria.value = { ..._criteria.value, ...criteria };
        router.push({
            query: {
                ...route.query,
                ...query,
            },
        });
        _updateFiltersChanged();
    };

    const setSorting = (sorting: Schemas['ProductListingResult']['sorting']) => {
        _criteria.value = { ..._criteria.value, order: sorting };
        router.push({
            query: {
                ...route.query,
                sort: sorting,
            },
        });
        _updateFiltersChanged();
    };

    const resetFilters = () => {
        _criteria.value = {
            ..._defaultCriteria.value,
            order: _criteria.value?.order,
            limit: _criteria.value?.limit,
            p: _criteria.value?.p,
        };
        const query = _criteriaToUrl(_criteria.value);

        router.push({
            query: {
                ...route.query,
                ...query,
            },
        });
        _updateFiltersChanged();
    };

    const setPage = (page: Schemas['ProductListingResult']['page']) => {
        _criteria.value = { ..._criteria.value, p: page };
        router.push({
            query: {
                ...route.query,
                p: page,
            },
        });
    };

    const setLimit = (limit: Schemas['ProductListingResult']['limit']) => {
        _criteria.value = { ..._criteria.value, limit };
        router.push({
            query: {
                ...route.query,
                limit,
            },
        });
    };

    return {
        criteria,
        appliedFilters,
        filters,
        areFiltersModified,
        sortingOptions,
        currentSorting,
        page,
        limit,
        total,
        initializeCriteria,
        updateCriteria,
        setSearchResult,
        setFilters,
        setSorting,
        resetFilters,
        setPage,
        setLimit,
    };
}
