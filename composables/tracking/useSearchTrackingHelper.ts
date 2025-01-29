import type { TrackingSearchEvent } from '../../types/analytics/search';

export function useSearchTrackingHelper() {
    const { getTotal } = useProductSearchSuggest();
    const { searchTerm } = storeToRefs(useSearchStore());

    const getSearchSuggestionEvent = (): TrackingSearchEvent => ({
        searchterm: searchTerm.value,
        searchresults: getTotal.value,
    });

    const getSearchEvent = (): TrackingSearchEvent => ({
        searchterm: searchTerm.value,
        searchresults: getTotal.value,
    });

    return {
        getSearchSuggestionEvent,
        getSearchEvent,
    };
}
