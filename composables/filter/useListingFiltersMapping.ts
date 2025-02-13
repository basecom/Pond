import type { ListingFilterMapping } from '~/types/listing/FilterMapping';

export function useListingFiltersMapping() {
    const filterCodes = ['price', 'properties'];

    const componentsMapping: Record<string, string> = {
        price: 'ProductListingFilterPrice',
        properties: 'ProductListingFilterProperties',
    };

    const componentsMappingOffcanvas: Record<string, string> = {
        price: 'ProductListingFilterOptionsPrice',
        properties: 'ProductListingFilterOptionsProperties',
    };

    const componentsMappingBadge: Record<string, string> = {
        price: 'ProductListingFilterBadgePrice',
        properties: 'ProductListingFilterBadgeProperties',
    };

    const filterMapping: Record<string, () => ListingFilterMapping> = {
        price: usePriceFilter,
        properties: usePropertiesFilter,
    };

    return {
        filterCodes,
        componentsMapping,
        componentsMappingOffcanvas,
        componentsMappingBadge,
        filterMapping,
    };
}
