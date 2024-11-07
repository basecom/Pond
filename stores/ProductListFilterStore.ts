export function useProductListingCriteriaStore(id: string) {
    return defineStore(`productListing${id}`, () => useProductListingCriteria())();
}
