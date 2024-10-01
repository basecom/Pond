import type { ListingFilterMapping } from '../types/listing/mapping';
import { usePriceUrlState } from './filters/usePriceUrlState';

export function useListingFiltersMapping() {
    const filterCodes = ['price'];
    const componentsMapping: Record<string, string> = {
        price: 'ProductListingFilterPrice',
    };

    const filterMapping: Record<string, () => ListingFilterMapping> = {
        price: usePriceUrlState,
    };

    return {
        filterCodes,
        componentsMapping,
        filterMapping,
    };
}
