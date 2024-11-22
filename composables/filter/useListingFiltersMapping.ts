import type { ListingFilterMapping } from '../../types/listing/mapping';

export function useListingFiltersMapping() {
    const filterCodes = ['price'];
    const componentsMapping: Record<string, string> = {
        price: 'ProductListingFilterPrice',
        properties: 'ProductListingFilterProperties'
    };

    const filterMapping: Record<string, () => ListingFilterMapping> = {
        price: usePriceFilter,
    };

    return {
        filterCodes,
        componentsMapping,
        filterMapping,
    };
}
