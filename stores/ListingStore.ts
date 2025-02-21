export function useListingStore(id: string) {
    return defineStore(`productListing-${id}`, () => useProductListing())();
}
