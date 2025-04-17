import type { LocationQuery, LocationQueryRaw } from '#vue-router';
import { getListingFilters } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter, ListingPriceFilter, ListingPropertyFilter } from '~/types/listing/Filter';
import type { ProductListingCriteria, ListingState } from '~/types/listing/ProductListingCriteria';
import type { RemoveFilterEvent } from '~/types/listing/FilterEvents';

// we need the composable to get filters correctly into the url and set them from the url
export function useProductListing() {
    const route = useRoute();
    const router = useRouter();
    const { filterMapping, filterCodes } = useListingFiltersMapping();

    const priceFilter = computed(() => listingState.value.filters.all?.find(filter => filter.code === 'price') as unknown as ListingPriceFilter);
    const propertiesFilter = computed(() => listingState.value.filters.all?.filter(filter => filter.code === 'properties') as unknown as ListingPropertyFilter[]);

    const listingState = ref({
        filters: {
            all: null,
            applied: null,
            appliedTotal: 0,
            modified: false,
        },
        sorting: {
            options: [],
            current: undefined,
        },
        pagination: {
            page: 1,
            limit: 24,
            total: 0,
        },
        criteria: null,
        defaultCriteria: {},
    } as ListingState);

    // use isLoading to display skeleton loaders for all the listing components (filter, product cards, pagination)
    const isLoading = ref(false);
    // use displayXYZSkeleton to display skeleton loader for an individual listing component
    const displayFilterSkeleton = ref(false);
    const displayCardSkeleton = ref(false);
    const displayPaginationSkeleton = ref(false);

    const filtersToCriteria = (filters: Schemas['ProductListingResult']['currentFilters']) => filterCodes.reduce((acc: Partial<ProductListingCriteria>, key: string): Partial<ProductListingCriteria> => {
        const urlMapper = filterMapping[key];

        if (!urlMapper) {
            return acc;
        }

        const mapper = urlMapper();
        const partialCriteria = mapper.createCriteria(filters);

        return { ...acc, ...partialCriteria };
    }, {} as Partial<ProductListingCriteria>);

    const updateFiltersChanged = () => {
        const { criteria } = listingState.value;
        if (!criteria) {
            listingState.value.filters.modified = false;
            return;
        }

        const { filters, defaultCriteria } = listingState.value;

        filters.modified = filterCodes.some((key: string): boolean => {
            const urlMapper = filterMapping[key];
            if (!urlMapper) {
                return false;
            }
            const mapper = urlMapper();

            return !mapper.isSameCriteria(criteria, defaultCriteria);
        });
    };

    const criteriaToUrl = (filters: Schemas['ProductListingCriteria']|null): LocationQueryRaw => filterCodes.reduce((queryParams: LocationQueryRaw, filterKey: string): LocationQueryRaw => {
        const urlMapper = filterMapping[filterKey];
        if (!urlMapper || !filters) {
            return queryParams;
        }

        const mapper = urlMapper();
        const partialQuery = mapper.encodeUrl(filters);

        return { ...queryParams, ...partialQuery };
    }, {} as LocationQueryRaw);

    const getFiltersFromQuery = (query: LocationQuery): Partial<Schemas['ProductListingCriteria']> => filterCodes.reduce((filters: Partial<Schemas['ProductListingCriteria']>, filterKey: string) => {
        const urlMapper = filterMapping[filterKey];
        if (!urlMapper) {
            return filters;
        }

        const mapper = urlMapper();
        const partialCriteria = mapper.decodeUrl(query);

        return { ...filters, ...partialCriteria };
    }, {} as Partial<Schemas['ProductListingCriteria']>);

    const initializeCriteria = (defaultCriteria: Partial<ProductListingCriteria>, routeQuery: LocationQuery) => {
        listingState.value.defaultCriteria = defaultCriteria;
        updateCriteria(routeQuery);
    };

    const updateCriteria = (routeQuery: LocationQuery, resetPagination: boolean = false) => {
        const { defaultCriteria } = listingState.value;

        // extract filter from url
        const filtersFromQuery = getFiltersFromQuery(routeQuery);

        // get sorting, limit, and page from the URL or use default values
        const sorting = routeQuery.order ? (routeQuery.order as string) : defaultCriteria.order;
        const limit = routeQuery.limit ? Number(routeQuery.limit) : defaultCriteria.limit;
        const page = routeQuery.p ? Number(routeQuery.p) : defaultCriteria.p;
        const search = routeQuery.search ? (routeQuery.search as string) : undefined;

        // assemble the new criteria by merging default criteria and filters
        listingState.value.criteria = {
            ...defaultCriteria,
            ...filtersFromQuery,
            order: sorting,
            limit,
            p: resetPagination ? 1 : page,
            search,
        };

        // Update the router query to match the current criteria
        // This ensures URL and state are always in sync
        const query = criteriaToUrl(listingState.value.criteria);
        router.push({
            query: {
                ...routeQuery,
                ...query,
                ...(resetPagination ? { p: 1 } : {}),
            },
        });

        // check if any filters have changed
        updateFiltersChanged();
    };

    const setSearchResult = (result: Schemas['ProductListingResult'], forceUpdate?: boolean) => {
        const { filters, sorting, pagination } = listingState.value;

        // Update the listingState properties with the values from the result
        filters.applied = result.currentFilters;
        filters.appliedTotal = result.currentFilters.properties.length + (isPriceFilterApplied() ? 1 : 0);
        sorting.current = result.sorting;
        pagination.limit = result.limit;
        pagination.page = result.page;
        pagination.total = result.total;

        // Update filters if necessary (either empty or forced update)
        if (filters.all?.length === 0 || forceUpdate) {
            filters.all = getListingFilters(result.aggregations) as ListingFilter[];
        }

        // Update sorting options if none are available
        if (sorting.options.length === 0) {
            sorting.options = result.availableSortings;
        }
    };

    const setFilters = (filters: Schemas['ProductListingResult']['currentFilters']) => {
        const criteria = filtersToCriteria(filters);
        const query = criteriaToUrl(criteria);

        const { filters: stateFilters, criteria: stateCriteria } = listingState.value;
        stateFilters.applied = filters;
        listingState.value.criteria = { ...stateCriteria, ...criteria };

        // Update the router query parameters to reflect the new filters
        router.push({
            query: {
                ...route.query,
                ...query,
                p: 1,
            },
        });

        updateFiltersChanged();
    };

    const setSorting = (sorting: Schemas['ProductListingResult']['sorting']) => {
        const { sorting: stateSorting, criteria: stateCriteria } = listingState.value;
        stateSorting.current = sorting;
        listingState.value.criteria = { ...stateCriteria, order: sorting };

        // Update the router query parameters to reflect the new sorting
        router.push({
            query: {
                ...route.query,
                order: sorting,
            },
        });

        updateFiltersChanged();
    };

    const resetFilters = () => {
        const { criteria: stateCriteria, defaultCriteria } = listingState.value;

        // Reset the filters and criteria, keeping the order, limit, and page values
        const resetCriteria = {
            ...defaultCriteria,
            order: stateCriteria?.order,
            limit: stateCriteria?.limit,
            p: stateCriteria?.p,
        };

        // Update and generate the listingState with the reset criteria
        listingState.value.criteria = resetCriteria;
        const query = criteriaToUrl(resetCriteria);

        // Update the router query parameters
        router.push({
            query: {
                ...route.query,
                ...query,
            },
        });

        updateFiltersChanged();
    };

    const setPage = (page: Schemas['ProductListingResult']['page']) => {
        const { criteria: stateCriteria } = listingState.value;

        // Update the listingState with the new page
        listingState.value.criteria = { ...stateCriteria, p: page };

        // Update the router query parameters to reflect the new page
        router.push({
            query: {
                ...route.query,
                p: page,
            },
        });
    };

    const setLimit = (limit: Schemas['ProductListingResult']['limit']) => {
        const { criteria: stateCriteria } = listingState.value;

        // Update the listingState with the new limit
        listingState.value.criteria = { ...stateCriteria, limit };

        // Update the router query parameters to reflect the new limit
        router.push({
            query: {
                ...route.query,
                limit,
            },
        });
    };

    const isPriceFilterApplied = () => {
        // Check if the applied price values are different from the default filter values
        const appliedPriceFilter = listingState.value.filters.applied?.price as Schemas['ProductListingResult']['currentFilters']['price'];

        // 0 is the default value, so 0 = unset
        if (appliedPriceFilter?.min === 0 && appliedPriceFilter?.max === 0) {
            return false;
        }

        return priceFilter.value?.min < appliedPriceFilter?.min || priceFilter.value?.max > appliedPriceFilter?.max;
    };

    const propertyFilterAppliedTotal = (id: Schemas['PropertyGroup']['id']) => {
        if (!listingState.value.filters.applied?.properties?.length) {
            return 0;
        }

        // Find the filter with the specified ID
        const filter = propertiesFilter.value.find((filter: ListingPropertyFilter) => filter.id === id);

        // If the filter exists, filter the applied options
        const appliedOptions = filter?.options?.filter((option: Schemas['PropertyGroupOption']) => listingState.value.filters.applied?.properties.includes(option.id));

        return appliedOptions?.length || 0;
    };

    const propertyFilterApplied = (id: Schemas['PropertyGroup']['id']) => propertyFilterAppliedTotal(id) > 0;

    const removeFilter = (filterDeletion: RemoveFilterEvent) => {
        if (!listingState.value.filters.applied) {
            return;
        }

        // Get the appropriate URL mapper for the filter code
        const urlMapper = filterMapping[filterDeletion.code];
        if (!urlMapper) {
            return;
        }

        // Get the filter mapper function and remove the filter from appliedFilters
        const mapper = urlMapper();
        mapper.removeFilter(listingState.value.filters.applied, filterDeletion.value ?? '');

        // Convert the updated appliedFilters to criteria and then to a query string
        const criteria = filtersToCriteria(listingState.value.filters.applied);
        const query = criteriaToUrl(criteria);

        // Update the router query to reflect the changes
        router.push({
            query: {
                ...route.query,
                ...query,
            },
        });

        updateFiltersChanged();
    };

    const getPropertyOption = (id: Schemas['PropertyGroupOption']['id']) => {
        if (!propertiesFilter.value) {
            return null;
        }

        for (const property of propertiesFilter.value) {
            const option = property.options?.find((option: Schemas['PropertyGroupOption']) => option.id === id);
            if (option) {
                return option;
            }
        }

        return null;
    };

    return {
        listingState,
        isLoading,
        displayFilterSkeleton,
        displayCardSkeleton,
        displayPaginationSkeleton,
        initializeCriteria,
        updateCriteria,
        setSearchResult,
        setFilters,
        setSorting,
        resetFilters,
        setPage,
        setLimit,
        isPriceFilterApplied,
        propertyFilterAppliedTotal,
        propertyFilterApplied,
        removeFilter,
        getPropertyOption,
    };
}
