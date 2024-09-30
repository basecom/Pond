export function useListingFiltersMapping() {
    const componentsMapping: Record<string, string> = {
        price: 'ProductListingFilterPrice',
        manufacturer: 'ProductListingFilterPrice',
    }

    return {
        componentsMapping,
    };
}