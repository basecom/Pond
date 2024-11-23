import type { ListingFilterMapping } from '../../types/listing/mapping';
import { usePropertiesFilter } from '~/composables/filter/usePropertiesFilter';

export function useListingFiltersMapping() {
    const filterCodes = ['price', 'properties'];
    const componentsMapping: Record<string, string> = {
        price: 'ProductListingFilterPrice',
        properties: 'ProductListingFilterProperties'
    };

    const filterMapping: Record<string, () => ListingFilterMapping> = {
        price: usePriceFilter,
        properties: usePropertiesFilter,
    };

    return {
        filterCodes,
        componentsMapping,
        filterMapping,
    };
}
