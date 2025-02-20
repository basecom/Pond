import type { LocationQueryRaw } from '#vue-router';
import type { Schemas } from '@shopware/api-client/api-types';

export type ListingFilterMapping = {
    encodeUrl: (value: Partial<Schemas['ProductListingCriteria']>) => LocationQueryRaw;
    decodeUrl: (value: LocationQueryRaw) => Partial<Schemas['ProductListingCriteria']>;
    createCriteria: (
        value: Schemas['ProductListingResult']['currentFilters'],
    ) => Partial<Schemas['ProductListingCriteria']>;
    isSameCriteria: (
        a: Partial<Schemas['ProductListingCriteria']>,
        b: Partial<Schemas['ProductListingCriteria']>,
    ) => boolean;
    removeFilter: (currentFilters: Schemas['ProductListingResult']['currentFilters'], id: string) => void
};
