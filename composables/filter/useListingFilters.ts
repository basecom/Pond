import type { ListingPriceFilter, ListingPropertyFilter, ListingFilter } from '~/types/listing/Filter';

export function useListingFilters() {
    // we need a unique property for each filter ListingXType

    const isPropertyFilter = (filter: ListingFilter): filter is ListingPropertyFilter => (filter as ListingPropertyFilter).visibleOnProductDetailPage !== undefined;
    const isPriceFilter = (filter: ListingFilter): filter is ListingPriceFilter => (filter as ListingPriceFilter).sum !== undefined;


    return {
        isPropertyFilter,
        isPriceFilter,
    };
}
