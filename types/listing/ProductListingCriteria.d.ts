import type { operations, Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '~/types/listing/Filter';

export type ProductListingCriteria =
    | operations['readProductListing post /product-listing/{categoryId}']['body']
    | operations['searchPage post /search']['body'];

export type ListingState = {
    filters: {
        all: ListingFilter[] | null;
        applied: Schemas['ProductListingResult']['currentFilters'] | null;
        appliedTotal: number;
        modified: boolean;
    },
    sorting: {
        options: Schemas['ProductListingResult']['availableSortings'];
        current: Schemas['ProductListingResult']['sorting'];
    },
    pagination: {
        page: Schemas['ProductListingResult']['page'];
        limit: Schemas['ProductListingResult']['limit'];
        total: Schemas['ProductListingResult']['total'];
    },
    criteria: ProductListingCriteria | null;
    defaultCriteria: Partial<ProductListingCriteria>;
};
